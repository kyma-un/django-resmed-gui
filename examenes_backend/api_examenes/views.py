from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import date
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from .models import Doctor, Paciente, Examen, Acompanante, Cita, ExamenRealizado
from .serializers import (
    DoctorSerializer, PacienteSerializer, ExamenSerializer,
    AcompananteSerializer, CitaSerializer, ExamenRealizadoSerializer
)

from google.oauth2 import id_token
from google.auth.transport import requests

User = get_user_model()

class HistorialPacienteAPIView(generics.ListAPIView):
    serializer_class = ExamenSerializer

    def get_queryset(self):
        paciente_id = self.request.query_params.get('paciente_id')
        return Examen.objects.filter(cita__paciente_id=paciente_id).order_by('-fecha', '-hora')
    
class CitasDelDiaDoctorAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if not hasattr(user, 'doctor'):
            return Response({"error": "No autorizado"}, status=403)

        citas = Cita.objects.filter(doctor=user.doctor).order_by('fecha', 'hora')
        serializer = CitaSerializer(citas, many=True)
        return Response(serializer.data)
    

class CrearDoctorView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        email = request.data.get('email')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')

        if not email:
            return Response({'error': 'Email es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(email=email, defaults={
            'username': email,
            'first_name': first_name,
            'last_name': last_name,
        })

        if not created:
            return Response({'error': 'El usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)

        # Aquí puedes marcar al usuario como doctor según tu modelo
        if hasattr(user, 'doctor'):
            return Response({'error': 'Ya tiene perfil de doctor'}, status=status.HTTP_400_BAD_REQUEST)

        # Si tienes un modelo Doctor relacionado con User (OneToOne)
        from .models import Doctor  # si está en el mismo archivo
        Doctor.objects.create(user=user)

        return Response({'message': 'Doctor creado exitosamente'}, status=status.HTTP_201_CREATED)

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class ExamenViewSet(viewsets.ModelViewSet):
    queryset = Examen.objects.all()
    serializer_class = ExamenSerializer

class AcompananteViewSet(viewsets.ModelViewSet):
    queryset = Acompanante.objects.all()
    serializer_class = AcompananteSerializer

class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer

class ExamenRealizadoViewSet(viewsets.ModelViewSet):
    queryset = ExamenRealizado.objects.all()
    serializer_class = ExamenRealizadoSerializer
        
# Create your views here.