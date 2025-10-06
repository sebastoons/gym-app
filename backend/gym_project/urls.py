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

def health_check(request):  # ✅ NUEVO
    return JsonResponse({'status': 'healthy'})

urlpatterns = [
    path('', home_view, name='home'),
    path('health/', health_check, name='health'),  # ✅ NUEVO
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
]