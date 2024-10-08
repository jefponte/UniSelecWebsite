import React from "react";
import { useGetStudentSelectionQuery } from '../features/studentSelection/studentSelectionSlice';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const ProtectedRouteBeforeStart = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading } = useGetStudentSelectionQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const isAfterStart = data?.studentSelection?.isAfterStart ?? false;
  const start = data?.studentSelection?.start;
  const end = data?.studentSelection?.end;

  if (!isAfterStart) {
    return (
      <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '2rem' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            As inscrições ainda não começaram
          </Typography>
          <Typography variant="body2" component="p" style={{ marginBottom: '1rem' }}>
            {start && end ? (
              <>O período de inscrições será de {new Date(start).toLocaleString('pt-PT')} até {new Date(end).toLocaleString('pt-PT')}.</>
            ) : (
              <>O período de inscrições será anunciado em breve.</>
            )}
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Voltar para a Página Inicial
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};
