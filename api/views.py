from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import PatientSerializer, TreatmentSerializer, PatientAppointmentSerializer, ProcessPaymentsSerializer
from .models import Patient, Treatment, PatientAppointment, ProcessPayments
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer

    def get_queryset(self):
        patients = Patient.objects.all().order_by('first_name')
        return patients


class TreatmentViewSet(viewsets.ModelViewSet):
    serializer_class = TreatmentSerializer

    def get_queryset(self):
        treatments = Treatment.objects.all().order_by('name')
        return treatments


class PatientAppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = PatientAppointmentSerializer

    def get_queryset(self):
        appointments = PatientAppointment.objects.all().order_by('-date_appointed')
        return appointments


    def create(self,request,*args,**kwargs):
        app_data = request.data 
        new_appointment = PatientAppointment.objects.create(date_appointed=app_data["date_appointed"],description=Treatment.objects.get(id=app_data["description"]),patient=Patient.objects.get(id=app_data["patient"]),status=app_data['status'])

        new_appointment.save()

        serializer = PatientAppointmentSerializer(new_appointment)
        return Response(serializer.data)


    def update(self,request,*args,**kwargs):
        appointmentsObject = self.get_object()
        data = request.data

        # patient = Patient.objects.get(id=data['patient'])
        # appointmentsObject.patient = patient 

        # description = Treatment.objects.get(id=data['description'])
        # appointmentsObject.description = description

        # appointmentsObject.date_appointed = data['date_appointed']
        appointmentsObject.status = data['status']

        appointmentsObject.save()

        serializer = PatientAppointmentSerializer(appointmentsObject)

        return Response(serializer.data)




class ProcessPaymentsViewSet(viewsets.ModelViewSet):
    serializer_class = ProcessPaymentsSerializer

    def get_queryset(self):
        payments = ProcessPayments.objects.all().order_by("-date")
        return payments


    def create(self, request, *args, **kwargs):
        app_data = request.data
        process_payment = ProcessPayments.objects.create(patient=Patient.objects.get(id=app_data["patient"]),description=Treatment.objects.get(id=app_data["description"]),date=app_data["date"],check_number=app_data['check_number'],amount=app_data['amount'],payment=app_data['payment'],balance=app_data['balance'],date_paid=app_data['date_paid'])

        process_payment.save()

        serializer = ProcessPaymentsSerializer(process_payment)
        return Response(serializer.data)