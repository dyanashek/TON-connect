from django.shortcuts import render
from django.http import JsonResponse
from django.views import View

class TonConnectManifestView(View):
    def get(self, request, *args, **kwargs):
        manifest = {
            "name": "My TON App",
            "url": "https://ton-auth-dyanashek.amvera.io",
            "iconUrl": "https://w7.pngwing.com/pngs/289/640/png-transparent-computer-icons-ios-7-ios-rectangle-waste-magenta-thumbnail.png"
        }

        return JsonResponse(manifest)