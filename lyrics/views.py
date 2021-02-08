import json

from django.conf import settings
from django.shortcuts import render


def landing(request):
    context = {
        "HOST_URL": settings.HOST_URL,
        "user": hasattr(request.user, 'email')
    }
    return render(request, "index.html", {"json_context": json.dumps(context)})
