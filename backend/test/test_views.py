from backend.models import CustomUser
from django.test import TestCase
from rest_framework.test import APIClient
from .. import views

class CustomUserTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
    def test_create_user_endpoint(self):
        response = self.client.post('/api/user/create/', {'username': 'testName', 'password': 'password', 'email': 'test@email.com'})
        self.assertEqual(response.status_code, 201)

    def test_create_user_duplicate_username(self):
        self.client.post('/api/user/create/', {'username': 'testName', 'password': 'password', 'email': 'test@email.com'})
        response = self.client.post('/api/user/create/', {'username': 'testName', 'password': 'newPassword', 'email': 'newtest@email.com'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['username'][0], 'Username duplicate')

    def test_create_user_duplicate_email(self):
        self.client.post('/api/user/create/', {'username': 'testName', 'password': 'password', 'email': 'test@email.com'})
        response = self.client.post('/api/user/create/', {'username': 'newTestName', 'password': 'password', 'email': 'test@email.com'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['email'][0], 'Email duplicate')

    def test_create_user_duplicate_email_and_username(self):
        self.client.post('/api/user/create/', {'username': 'testName', 'password': 'password', 'email': 'test@email.com'})
        response = self.client.post('/api/user/create/', {'username': 'testName', 'password': 'password', 'email': 'test@email.com'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['email'][0], 'Email duplicate')
        self.assertEqual(response.data['username'][0], 'Username duplicate')

    def test_create_user_required_email(self):
        response = self.client.post('/api/user/create/', {'username': 'testName', 'password': 'password'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['email'][0].code, 'required')

    def test_create_user_required_password(self):
        response = self.client.post('/api/user/create/', {'username': 'testName', 'email': 'newTest@email.com'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['password'][0].code, 'required')

    def test_create_user_min_length_password(self):
        response = self.client.post('/api/user/create/', {'username': 'testName', 'password': 'short', 'email': 'newTest@email.com'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['password'][0].code, 'min_length')

    def test_create_user_required_username(self):
        response = self.client.post('/api/user/create/', {'password': 'password', 'email': 'newTest@email.com'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['username'][0].code, 'required')

class PuzzleTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.client.post('/api/user/create/', {'username': 'testName', 'password': 'password', 'email': 'test@email.com'})
        token = self.client.post('/api/token/obtain/', {'username': 'testName', 'password': 'password'}).data['access']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
        

    def test_create_puzzle_duplicate_creator_and_name(self):
        user = CustomUser.objects.get(username='testName')
        self.client.post('/api/puzzle/create/', {
            'name': 'testName',
            'creator': user.pk,
            'date': '2021-09-05',
            'given_digits': '000000001000000002000000003000000004000000005000000006000000007000000008000000009',
            'cell_colors': '000000001000000002000000003000000004000000005000000006000000007000000008000000009',
            'solution_digits': '000000001000000002000000003000000004000000005000000006000000007000000008000000009',
            'completed': True,
            'average_solve_time': '0:0:0',
            'average_rating': 11,
            'rule_set': 'Regular sudoku rules apply.',
            'diagonals': 0,
            'loaded_puzzle': 0
          }, format='json')
        response = self.client.post('/api/puzzle/create/', {
            'name': 'testName',
            'creator': user.pk,
            'date': '2021-09-06',
            'given_digits': '100000001000000002000000003000000004000000005000000006000000007000000008000000009',
            'solution_digits': '100000001000000002000000003000000004000000005000000006000000007000000008000000009',
            'cell_colors': '200000001000000002000000003000000004000000005000000006000000007000000008000000009',
            'completed': True,
            'average_solve_time': '0:0:0',
            'average_rating': 11,
            'rule_set': 'Regular sudoku rules apply.',
            'diagonals': 1,
            'loaded_puzzle': 0
          }, format='json')

        self.assertEqual(response.status_code, 409)
        print(response.data['message'])
        self.assertEqual(str(response.data['message']['non_field_errors'][0]), 'Puzzle name already exists for this creator.')

    def test_create_puzzle_required_fields(self):
        user = CustomUser.objects.get(username='testName')
        response = self.client.post('/api/puzzle/create/', {})
        print(response)
        self.assertEqual(response.data['message']['name'][0].code, 'required')
        self.assertEqual(response.data['message']['creator'][0].code, 'required')
        self.assertEqual(response.data['message']['date'][0].code, 'required')
        self.assertEqual(response.data['message']['given_digits'][0].code, 'required')
        self.assertEqual(response.data['message']['cell_colors'][0].code, 'required')
        self.assertEqual(response.data['message']['rule_set'][0].code, 'required')
        self.assertEqual(response.data['message']['diagonals'][0].code, 'required')

