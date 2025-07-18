from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .auth_views import LoginView, GoogleLoginView
from .views import (
    DoctorViewSet, PacienteViewSet, ExamenViewSet, AcompananteViewSet,
    CitaViewSet, ExamenRealizadoViewSet, CrearDoctorView, CitasDelDiaDoctorAPIView
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
    path('login/manual/', LoginView.as_view(), name='login_manual'),
    path('login/google/', GoogleLoginView.as_view(), name='login_google'),
    path('crear-doctor/', CrearDoctorView.as_view(), name='crear-doctor'),
    path('citas/doctor/', CitasDelDiaDoctorAPIView.as_view(), name='citas-doctor'),
]