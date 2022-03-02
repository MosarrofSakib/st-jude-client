from rest_framework import serializers
from .models import Patient,Treatment,PatientAppointment, ProcessPayments


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = '__all__'


class PatientAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAppointment
        fields = '__all__'
        depth = 2


class ProcessPaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessPayments
        fields = '__all__'
        depth = 2