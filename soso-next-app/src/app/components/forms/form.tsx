import { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
`;

const FormField = styled.div`
  margin: 10px 0;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #000;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #000;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    target: 'SOSO-1',
    activity: 'MemoryScrub',
    startTime: '',
    endTime: '',
    frequency: {
      minimum: '10',
      maximum: '100',
    },
    repetition: 1,
    payloadOutage: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

   return (
    <FormContainer onSubmit={handleSubmit}>
      <FormField>
        <Label>
          Target:
          <Select name="target" value={formData.target} onChange={handleChange}>
            <option value="SOSO-1">SOSO-1</option>
            <option value="SOSO-2">SOSO-2</option>
            <option value="SOSO-3">SOSO-3</option>
            <option value="SOSO-4">SOSO-4</option>
            <option value="SOSO-5">SOSO-5</option>
          </Select>
        </Label>
      </FormField>
      <FormField>
        <Label>
          Activity:
          <Select name="activity" value={formData.activity} onChange={handleChange}>
            <option value="MemoryScrub">MemoryScrub</option>
            <option value="OrbitMaintenance">OrbitMaintenance</option>
            <option value="OrbitParameter">OrbitParameter</option>
            <option value="PayloadDiagnostic">PayloadDiagnostic</option>
          </Select>
        </Label>
      </FormField>
      <FormField>
        <Label>
          Start Time:
          <Input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
        </Label>
      </FormField>
      <FormField>
        <Label>
          End Time:
          <Input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} />
        </Label>
      </FormField>
      <FormField>
        <Label>
          Frequency:
          <div>
            <Label>
              Minimum:
              <Input type="text" name="frequency.minimum" value={formData.frequency.minimum} onChange={handleChange} />
            </Label>
            <Label>
              Maximum:
              <Input type="text" name="frequency.maximum" value={formData.frequency.maximum} onChange={handleChange} />
            </Label>
          </div>
        </Label>
      </FormField>
      <FormField>
        <Label>
          Repetition:
          <Input type="number" name="repetition" value={formData.repetition} onChange={handleChange} />
        </Label>
      </FormField>
      <FormField>
        <Label>
        Payload Outage:
          <Select name="payloadOutage" value={formData.payloadOutage} onChange={handleChange}>
            <option value="true">True</option>
            <option value="false">False</option>
          </Select>
        </Label>
      </FormField>
      <FormField>
        <Button type="submit">Submit</Button>
      </FormField>
    </FormContainer>
  );
};



export default Form;
