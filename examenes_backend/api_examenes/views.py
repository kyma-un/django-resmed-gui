from rest_framework import viewsets
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
# Create your views here.
