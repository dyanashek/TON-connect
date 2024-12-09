from django.urls import path
from django.views.generic import TemplateView

from . import views as core_views

app_name = 'core'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='loader'),
    path('profile/', TemplateView.as_view(template_name='profile.html'), name='profile'),
    path('solana/', TemplateView.as_view(template_name='solana.html'), name='solana'),
    path('tonconnect-manifest.json', core_views.TonConnectManifestView.as_view(), name='tonconnect_manifest'),
    ]
