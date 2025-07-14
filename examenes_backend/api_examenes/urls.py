from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DoctorViewSet, PacienteViewSet, ExamenViewSet, AcompananteViewSet,
    CitaViewSet, ExamenRealizadoViewSet
)

router = DefaultRouter()
router.register(r'doctores', DoctorViewSet)
router.register(r'pacientes', PacienteViewSet)
router.register(r'examenes', ExamenViewSet)
router.register(r'acompanantes', AcompananteViewSet)
router.register(r'citas', CitaViewSet)
router.register(r'examenes-realizados', ExamenRealizadoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]