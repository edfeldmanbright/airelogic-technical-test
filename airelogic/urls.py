from django.urls import path, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from graphene_file_upload.django import FileUploadGraphQLView

from lyrics.views import landing

graphql_view = FileUploadGraphQLView.as_view(graphiql=settings.DEBUG)

urlpatterns = [
    path('graphql/', csrf_exempt(graphql_view)),
    re_path(r"^(?:.*)/?$", landing, name='landing'),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.STATIC_URL, document_root=settings.STATIC_DIR)
    urlpatterns += static(
        settings.STATIC_URL, document_root=settings.REACT_APP_STATIC_DIR)
