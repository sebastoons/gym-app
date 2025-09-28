from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({
        'message': 'GymApp Backend API',
        'status': 'running',
        'endpoints': {
            'admin': '/admin/',
            'api_auth': '/api/auth/',
            'register': '/api/auth/register/',
            'login': '/api/auth/login/',
        }
    })

urlpatterns = [
    path('', home_view, name='home'),  # Ruta para la raíz
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
]