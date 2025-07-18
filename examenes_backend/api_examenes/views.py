from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import Doctor, Paciente, Examen, Acompanante, Cita, ExamenRealizado
from .serializers import (
    DoctorSerializer, PacienteSerializer, ExamenSerializer,
    AcompananteSerializer, CitaSerializer, ExamenRealizadoSerializer
)

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

class LoginManualView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)  # Opcional: para mantener sesión
            return Response({"message": "Login exitoso"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
# Create your views here.
