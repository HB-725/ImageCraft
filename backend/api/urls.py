from django.urls import path
from .views import LoginView, GenerateImageView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('generate/', GenerateImageView.as_view(), name='generate-image'),
]
