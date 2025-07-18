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
        
    def create(self, validated_data):
        user = validated_data.get('user')
        paciente, created = Paciente.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            # Si ya existe, podrías actualizar campos si quieres
            for attr, value in validated_data.items():
                setattr(paciente, attr, value)
            paciente.save()
        return paciente

class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = '__all__'

class AcompananteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acompanante
        fields = ["fecha", "hora", "paciente", "examen"]

class CitaSerializer(serializers.ModelSerializer):
    paciente = serializers.CharField(source="paciente.user.get_full_name")
    examen = serializers.CharField(source="examen.nombre")
    fecha = serializers.DateField(format="%Y-%m-%d")  # formato ISO
    hora = serializers.TimeField(format="%H:%M")      # formato de 24h

    class Meta:
        model = Cita
        fields = '__all__'

class ExamenRealizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenRealizado
        fields = '__all__'
