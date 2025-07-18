from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model, login
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import Doctor, Paciente
from .utils import generar_cedula_unica 

User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    role = get_user_role(user)
    
    # Insertamos el rol en el payload del access token
    refresh["role"] = role
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def get_user_role(user):
    if hasattr(user, 'doctor'):
        return 'doctor'
    elif hasattr(user, 'paciente'):
        return 'paciente'
    elif user.is_superuser:
        return 'admin'
    return 'usuario'

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            tokens = get_tokens_for_user(user)
            return Response(tokens)
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({'error': 'Token no enviado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request())
            email = idinfo['email']
            full_name = idinfo.get('name', '')

            # Separa nombre y apellido
            parts = full_name.split(' ', 1)
            first_name = parts[0]
            last_name = parts[1] if len(parts) > 1 else ''

            username = email.split('@')[0]

            user, created = User.objects.get_or_create(email=email, defaults={
                "username": username,
                "first_name": first_name,
                "last_name": last_name,
            })

            # Si fue creado, asegúrate de actualizar nombre y username correctamente
            if created:
                user.username = username
                user.first_name = first_name
                user.last_name = last_name
                user.save()

            # Crear perfil de paciente si no existe
            if not hasattr(user, "paciente") and not hasattr(user, "doctor"):
                cedula = generar_cedula_unica()
                Paciente.objects.create(
                    user=user,
                    cedula=cedula,
                    nombre=f"{first_name} {last_name}"
                )

            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "role": get_user_role(user),
            })
        except Exception as e:
            print(f"Error en login con Google: {e}")
            return Response({"error": "Token inválido o error interno"}, status=400)