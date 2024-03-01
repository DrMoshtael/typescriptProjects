import { Patient } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

const PatientPage = ({ id }: { id: string | null | undefined }) => {
    const [patient, setPatient] = useState<Patient>();
    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                const the_patient = await patientService.getOne(id);
                setPatient(the_patient);
            }
        };
        fetchPatient();
    }, [id]);

    if (patient)
        return (
            <div>
                <h2>{patient.name}</h2>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
                <div>gender: {patient.gender}</div>
                <div>DOB: {patient.dateOfBirth}</div>
            </div>
        );
};

export default PatientPage;