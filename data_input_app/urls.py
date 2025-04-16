# data_input_app/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse  # 👈 Add this

def home_view(request):  # 👈 Add a simple home view
    return HttpResponse("✅ Backend is running. Visit /api/ for API endpoints.")

urlpatterns = [
    path('', home_view),  # 👈 Add this line to handle the root URL
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
