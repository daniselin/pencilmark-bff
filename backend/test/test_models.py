from django import test
from django.test import TestCase
from backend.models import CustomUser

class CustomUserTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create(username="testName", password="password", email="test@email.com")

    def test_user_score_set_to_zero(self):
        """Animals that can speak are correctly identified"""
        testUser = CustomUser.objects.get(username="testName")
        self.assertEqual(testUser.score, 0)
