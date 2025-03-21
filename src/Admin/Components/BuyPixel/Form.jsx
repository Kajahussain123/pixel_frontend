import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Box, Typography, Paper, Select, MenuItem, InputLabel, FormControl, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; // For redirection
import { toast, ToastContainer } from 'react-toastify'; // For toast messages
import 'react-toastify/dist/ReactToastify.css'; // Toast styles
import { adminBuyPixel } from '../../../Services/allApi';

const StyledPaper = styled(Paper)({
  padding: '30px',
  borderRadius: '20px',
  maxWidth: '800px',
  margin: 'auto',
  position: 'relative',
  marginBottom: "30px"
});

const UploadBox = styled(Box)({
  border: '2px dashed #ccc',
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10px',
  marginBottom: '20px',
});

const MediaPreview = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '10px',
});

const MediaItem = styled(Box)({
  position: 'relative',
  width: '100px',
  height: '100px',
  overflow: 'hidden',
  borderRadius: '10px',
  border: '1px solid #ccc'
});

const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: '-5px',
  right: '-5px',
  background: 'rgba(0,0,0,0.6)',
  color: '#fff',
  zIndex: 2,
});

const AdminBuyNowForm = () => {
  const [pixelCount, setPixelCount] = useState(1);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('IN');
  const [companyName, setCompanyName] = useState('');
  const [organicLead, setOrganicLead] = useState('');
  const [message, setMessage] = useState('');
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [currency, setCurrency] = useState({ code: "", symbol: "" });


  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      setUserId(adminId);
      console.log("Admin ID from localStorage:", adminId); // Debugging
    } else {
      console.log("No adminId found in localStorage"); // Debugging
    }
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data.map((country) => {
          // Ensure 'currencies' exist before accessing it
          const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : null;
          const currencySymbol = currencyCode && country.currencies[currencyCode] ? country.currencies[currencyCode].symbol : null;

          return {
            code: country.cca2,
            name: country.name.common,
            flag: country.flags?.svg || "", // Handle missing flag
            currencyCode: currencyCode || "N/A", // Default to "N/A" if missing
            currencySymbol: currencySymbol || "$", // Default to "N/A" if missing
          };
        });


        // Sort countries alphabetically
        countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handlePixelChange = (event) => {
    const value = event.target.value;

    if (value === "") {
      setPixelCount(""); // Allow empty input
      return;
    }

    const count = parseInt(value, 10);
    setPixelCount(count > 0 ? count : 1);
    setMediaFiles([]); // Reset media when changing pixels
  };


  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newMedia = [];
    for (let file of files) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type === "video/mp4";
      if (!isImage && !isVideo) {
        alert("Only JPG, PNG, and MP4 files are allowed.");
        return;
      }
      if (isVideo) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          if (video.duration > 30) {
            alert("Videos must be 30 seconds or less.");
          } else if (mediaFiles.length + newMedia.length < pixelCount) {
            newMedia.push(file);
            setMediaFiles([...mediaFiles, ...newMedia]);
          } else {
            alert(`You can upload only ${pixelCount} media files.`);
          }
        };
        video.src = URL.createObjectURL(file);
      } else {
        if (mediaFiles.length + newMedia.length < pixelCount) {
          newMedia.push(file);
        } else {
          alert(`You can upload only ${pixelCount} media files.`);
          return;
        }
      }
    }
    setMediaFiles([...mediaFiles, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCountry('IN');
    setPixelCount(1);
    setCompanyName('');
    setOrganicLead('');
    setMessage('');
    setMediaFiles([]);
    setPaymentReceived(false);
  };
  const razorpaySupportedCurrencies = [
    "INR", "USD", "EUR", "GBP", "SGD", "AED", "AUD", "CAD", "CNY", "SEK", "NZD", "MXN",
    "RUB", "ALL", "AMD", "ARS", "AWG", "BBD", "BDT", "BMD", "BND", "BOB", "BSD", "BWP",
    "BZD", "CHF", "COP", "CRC", "CUP", "CZK", "DKK", "DOP", "DZD", "EGP", "ETB", "FJD",
    "GIP", "GMD", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "JMD",
    "KES", "KGS", "KHR", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "MAD", "MDL",
    "MKD", "MMK", "MNT", "MOP", "MUR", "MVR", "MWK", "MYR", "NAD", "NGN", "NIO", "NOK",
    "NPR", "PEN", "PGK", "PHP", "PKR", "QAR", "SAR", "SCR", "SLL", "SOS", "SSP", "SVC",
    "SZL", "THB", "TTD", "TZS", "UYU", "UZS", "YER"
  ];
  const getValidCurrency = (currencyCode) => {
    return razorpaySupportedCurrencies.includes(currencyCode) ? currencyCode : "USD"; // Convert unsupported currency to USD
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    setIsLoading(true);
    const validCurrency = getValidCurrency(currency.code);
    const currencySymbol = currency?.symbol || "$"; // Default to USD

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('noOfPixels', pixelCount);
    formData.append('companyName', companyName);
    formData.append('organicLead', organicLead);
    formData.append('message', message);
    formData.append('isAdminOrder', true);
    formData.append('currencyCode', validCurrency); // ✅ Added
    formData.append('currencySymbol', currencySymbol); // ✅ Added

    formData.append('paymentReceived', paymentReceived);

    mediaFiles.forEach((file) => {
      formData.append('file', file);
    });

    // Debugging: Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await adminBuyPixel(formData);
      console.log('API Response:', response);

      toast.success('Order placed successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      resetForm();

      setTimeout(() => {
      }, 3000);
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
};


  return (
    <Container>
      <ToastContainer /> {/* Toast container for displaying messages */}
      <Typography style={{ fontFamily: "'Playfair Display', serif", }} variant="h4" fontWeight="bold" textAlign="center" marginBottom={3} marginTop={5}>
        Buy Now
      </Typography>
      <StyledPaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone number"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                value={country}
                onChange={(e) => {
                  const selectedCountry = countries.find(c => c.code === e.target.value);
                  setCountry(e.target.value);
                  setCurrency({
                    code: selectedCountry.currencyCode,
                    symbol: selectedCountry.currencySymbol
                  });
                }}
              >
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.code}>
                    <img src={c.flag} alt={c.name} width="20" style={{ marginRight: 8 }} />
                    {c.name} ({c.currencyCode ? `${c.currencyCode} ${c.currencySymbol || ''}` : 'No Currency'})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="No of pixels"
              variant="outlined"
              type="number"
              value={pixelCount}
              onChange={handlePixelChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">$1 per pixel</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company name"
              variant="outlined"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Grid>

          {/* Upload Section */}
          <Grid item xs={12}>
            <UploadBox>
              Click here to upload images or videos
              <Box mt={2}>
                <input
                  type="file"
                  accept="image/jpeg, image/png, video/mp4"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="upload-input"
                />
                <label htmlFor="upload-input">
                  <Button variant="contained" color="success" component="span">
                    Upload file
                  </Button>
                </label>
              </Box>
              <Box mt={2} p={2} bgcolor="#F9F9F9" borderRadius={2} border="1px solid #ddd">
                <Typography variant="body2" color="textSecondary">
                  <strong>Note:</strong>
                  <ul>
                    <li>You can upload up to <strong>{pixelCount}</strong> media files.</li>
                    <li>Accepted image formats: <strong>JPG, PNG</strong>.</li>
                    <li>Accepted video format: <strong>MP4</strong> (max 30 seconds).</li>
                  </ul>
                </Typography>
              </Box>
            </UploadBox>
          </Grid>

          {/* Media Previews */}
          <Grid item xs={12}>
            <MediaPreview>
              {mediaFiles.map((file, index) => (
                <MediaItem key={index}>
                  <DeleteButton size="small" onClick={() => handleDeleteMedia(index)}>
                    <DeleteIcon fontSize="small" />
                  </DeleteButton>
                  {file.type.startsWith("image") ? (
                    <img src={URL.createObjectURL(file)} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <video src={URL.createObjectURL(file)} controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </MediaItem>
              ))}
            </MediaPreview>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Organic lead"
              variant="outlined"
              placeholder="You can paste your profile link or website link"
              value={organicLead}
              onChange={(e) => setOrganicLead(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={paymentReceived}
                  onChange={(e) => setPaymentReceived(e.target.checked)}
                  color="primary"
                />
              }
              label="Payment Received"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={isLoading || !userId}
            >
              {isLoading ? 'Placing Order...' : 'Buy Now'}
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default AdminBuyNowForm;