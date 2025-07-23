from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from apps.users.serializers.language import LanguageSerializer

class LanguageUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = LanguageSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        return self.put(request)
