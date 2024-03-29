import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsPublic());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) res.send(patient);
    else res.sendStatus(404);
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});

router.get('/:id/entries', (req,res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) res.send(patient.entries);
    else res.sendStatus(404);
});

router.post('/:id/entries', (req,res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(req.params.id, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});

export default router;