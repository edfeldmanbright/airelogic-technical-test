from django.urls import path, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from graphene_file_upload.django import FileUploadGraphQLView

from lyrics.views import landing

urlpatterns = [
    path('graphql/', csrf_exempt(FileUploadGraphQLView.as_view(graphiql=settings.DEBUG))),
    re_path(r"^(?:.*)/?$", landing, name='landing'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_DIR)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.REACT_APP_STATIC_DIR)