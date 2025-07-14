from django.contrib import admin

# Register your models here.
from .models import Doctor, Paciente, Examen, Acompanante, Cita, ExamenRealizado

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('cedula', 'nombre', 'especialidad', 'tarjeta_profesional')
    search_fields = ('nombre', 'cedula', 'especialidad')

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('cedula', 'nombre', 'profesion', 'peso', 'altura')
    search_fields = ('nombre', 'cedula')

@admin.register(Examen)
class ExamenAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre', 'tiempo_estimado')
    search_fields = ('nombre',)

@admin.register(Acompanante)
class AcompananteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'numero_contacto', 'parentesco')
    search_fields = ('nombre',)

@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = ('paciente', 'doctor', 'especialidad', 'fecha', 'hora')
    list_filter = ('fecha', 'especialidad')

@admin.register(ExamenRealizado)
class ExamenRealizadoAdmin(admin.ModelAdmin):
    list_display = ('cita', 'doctor_ejecutor', 'fecha_realizacion', 'hora_realizacion')
    list_filter = ('fecha_realizacion',)