import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Diagnose, HealthCheckRating, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Typography from '@mui/material/Typography';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from "@mui/material";
import EntryForm from "./EntryForm";

interface VisibleButtons {
    hospital: boolean,
    occupationalCheck: boolean,
    healthCheck: boolean,
};

const PatientInfo = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>();
    const [visible, setVisible] = useState<VisibleButtons>({
        hospital: false,
        occupationalCheck: false,
        healthCheck: false,
       })    


    useEffect(() => {
        const fetchPatient = async () => {
            if (id !== undefined) {
                const patient = await patientService.getById(id)
                setPatient(patient);
            }
        }
        const fetchDiagnoses = async () => {
            const diagnose = await diagnoseService.getAll();
            setDiagnoses(diagnose);
        }
        void fetchPatient()
        void fetchDiagnoses()
    }, [id])

    if (patient === undefined) {
        return <p>Patient not found</p>
    }

    const findDiagnoseDesc = (code: string) => {
        const diagnose = diagnoses?.find(diagnose => diagnose.code === code)
        return diagnose?.name
    }

    return (
        <div>

                <Typography variant="h5" style={{ marginBottom: "0.5em", marginTop: '0.5em' }}>
                    <strong>{patient.name}</strong> 
                    <span>  {patient.gender === 'female' && <FemaleIcon></FemaleIcon>}</span>
                    <span>  {patient.gender === 'male' && <MaleIcon></MaleIcon>}</span>
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '1em'}}>
                    ssn: {patient.ssn}<br></br>
                    occupation: {patient.occupation}
                </Typography>
                
                <Button style={{ marginRight: '10px'}}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setVisible({
                      hospital: false,
                      occupationalCheck: false,
                      healthCheck: true,
                    });
                  }}
                >
                  Add Health Check Entry
                </Button>
                <Button style={{ marginRight: '10px'}}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setVisible({
                      hospital: false,
                      occupationalCheck: true,
                      healthCheck: false,
                    });
                  }}
                >
                  Add Occupational Check Entry
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setVisible({
                      hospital: true,
                      occupationalCheck: false,
                      healthCheck: false,
                    });
                  }}
                >
                  Add Hospital Entry
                </Button>
            
            {visible.healthCheck && (
              <EntryForm
                patientId={patient.id}
                type="HealthCheck"
                callback={() => {
                  setVisible({
                    ...visible,
                    healthCheck: false,
                  });
                }}
                diagnoses={diagnoses || []}
              />
            )}
            {visible.hospital && (
              <EntryForm
                patientId={patient.id}
                type="Hospital"
                callback={() => {
                  setVisible({
                    ...visible,
                    hospital: false,
                  });
                }}
                diagnoses={diagnoses || []}
              />
            )}
            {visible.occupationalCheck && (
              <EntryForm
                patientId={patient.id}
                type="OccupationalHealthcare"
                callback={() => {
                  setVisible({
                    ...visible,
                    occupationalCheck: false,
                  });
                }}
                diagnoses={diagnoses || []}
              />
            )}


                    <Typography variant="h6" style={{ marginBottom: '8px', marginTop: '16px' }}>
                    entries
                    </Typography>
                    <Typography variant="body2">
                        {patient.entries.map(entry => (
                            <div style={{ border: '1px solid black', padding: '5px', marginBottom: '10px', borderRadius: '10px' }}
                            key={entry.id}>{entry.date}
                            <span> {entry.type === "HealthCheck" && <MedicalServicesIcon></MedicalServicesIcon>}</span>
                            <span> {entry.type === "OccupationalHealthcare" && <WorkIcon></WorkIcon>}</span>
                            <br></br>
                            <i>{entry.description}</i>
                            <br></br>
                            {entry.type === "HealthCheck" && (
                                <>
                                    {entry.healthCheckRating === HealthCheckRating.Healthy && <FavoriteIcon style={{ color: "green" }} />}
                                    {entry.healthCheckRating === HealthCheckRating.LowRisk && <FavoriteIcon style={{ color: "yellow" }} />}
                                    {entry.healthCheckRating === HealthCheckRating.HighRisk && <FavoriteIcon style={{ color: "orange" }} />}
                                    {entry.healthCheckRating === HealthCheckRating.CriticalRisk && <FavoriteIcon style={{ color: "red" }} />}
                                </>
                            )}
                                <ul>
                                    {entry.diagnosisCodes?.map(code => (
                                        <li key={code}>{code} {findDiagnoseDesc(code)} </li>
                                    ))}
                                </ul>
                                Diagnosed by {entry.specialist}
                            </div>
                        ))}
                    </Typography>
        </div>
    )
}

export default PatientInfo;
