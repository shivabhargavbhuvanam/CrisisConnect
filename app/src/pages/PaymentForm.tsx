import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, CircularProgress, Typography, TextField, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useTranslation('paymentform');

  const handleProceed = () => {
    setShowInfo(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setLoading(false);
      setErrorMessage('Please enter your credit card information.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: {
        name: cardHolderName
      }
    });

    if (error) {
      setLoading(false);
      setErrorMessage(error.message || 'An error occurred while processing your payment.');
    } else {
      console.log('Payment Method:', paymentMethod);
      saveDonationToMongoDB(Number(donationAmount));
      setLoading(false);
      setSuccess(true);
    }
  };

  const saveDonationToMongoDB = async (amount: number) => {
    try {
      const userDetails = {
        username: user?.username,
        firstName: user?.firstName,
        emailAddress: user?.emailAddresses[0]?.emailAddress,
        donationAmount: amount,
      };

      const response = await fetch('http://localhost:3000/donation-campaigns/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails)
      });

      if (!response.ok) {
        throw new Error('Failed to save donation');
      }
    } catch (error) {
      console.error('Failed to save donation', error);
    }
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <FullPageContainer>
      {showInfo ? (
        <InfoContainer>
          <Typography variant="h4" component="h1" gutterBottom>
          {t('paymentForm.title')}
          </Typography>
          <Typography variant="body1" gutterBottom>
          {t('paymentForm.description')}
          </Typography>
          <StyledButton onClick={handleProceed}>
          {t('paymentForm.button.learnMore')}
          </StyledButton>
        </InfoContainer>
      ) : success ? (
        <>
          <Typography color="green" gutterBottom>Successfully Donated ${donationAmount} Dollars</Typography>
          <StyledButton onClick={handleReturnHome}>{t('paymentForm.button.returnHome')}</StyledButton>
        </>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
<img
  src="https://i.pinimg.com/originals/f8/b0/a2/f8b0a277e663688f577cf09101d1d1fe.gif"
  alt="Credit/Debit Card"
  style={{ maxWidth: '110%', marginBottom: 16 }} // Increases the maximum width to 110% of the container width
/>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={t('paymentForm.label.donationAmount')}
                type="text" // Changed to "text" to remove up and down buttons
                variant="outlined"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={t('paymentForm.label.cardHolderName')}
                variant="outlined"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <CardElementContainer>
                <CardNumberElement options={{ showIcon: true }} />
              </CardElementContainer>
            </Grid>
            <Grid item xs={6}>
              <CardElementContainer>
                <CardExpiryElement />
              </CardElementContainer>
            </Grid>
            <Grid item xs={6}>
              <CardElementContainer>
                <CardCvcElement />
              </CardElementContainer>
            </Grid>
            <Grid item xs={12}>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Grid>
            <Grid item xs={12}>
              <StyledButton type="submit" disabled={!stripe || loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay'}
              </StyledButton>
            </Grid>
          </Grid>
        </StyledForm>
      )}
    </FullPageContainer>
  );
};

const FullPageContainer = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

const InfoContainer = styled('div')({
  textAlign: 'center',
  maxWidth: 600,
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

const StyledForm = styled('form')({
  width: '100%',
  maxWidth: 400,
});

const CardElementContainer = styled('div')({
  marginTop: 16,
  padding: 12,
  borderRadius: 8,
  backgroundColor: '#f8f8f8',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:focus-within': {
    boxShadow: '0px 0px 8px 2px #007bff',
  },
});

const StyledButton = styled(Button)({
  marginTop: 16,
  width: '100%',
});

const ErrorMessage = styled(Box)({
  color: 'red',
  marginTop: 8,
});

export default PaymentForm;











