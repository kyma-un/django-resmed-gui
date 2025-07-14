from rest_framework import serializers
from .models import Doctor, Paciente, Examen, Acompanante, Cita, ExamenRealizado

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = '__all__'

class AcompananteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acompanante
        fields = '__all__'

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'

class ExamenRealizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenRealizado
        fields = '__all__'
