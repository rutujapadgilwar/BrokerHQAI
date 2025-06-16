import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Stack,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

// Add styled components
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: 'none',
  '&:before': { display: 'none' },
  '&.Mui-expanded': {
    margin: '8px 0',
  },
  '& .MuiAccordionSummary-root': {
    borderRadius: theme.shape.borderRadius * 2,
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.04)',
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
  '& .MuiSelect-select': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: 'white',
  textTransform: 'none',
  fontWeight: 500,
  padding: '10px 24px',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
    boxShadow: theme.shadows[4],
    transform: 'translateY(-1px)',
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: 'rgba(99, 102, 241, 0.04)',
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${theme.palette.primary.light}40`,
    },
  },
  '& .MuiSlider-track': {
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const FilterPanel = ({ selectedRole }) => {
  const theme = useTheme();
  
  // Common state for all roles
  const [savedView, setSavedView] = useState('default');
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Properties-specific state
  const [score, setScore] = useState(70);
  const [propertyTypes, setPropertyTypes] = useState({
    Office: false,
    Industrial: false,
    Retail: false,
    Multifamily: false,
    Land: false,
  });
  const [leaseExpiryOptions, setLeaseExpiryOptions] = useState({
    lessThan6Months: false,
    sixToTwelveMonths: false,
    moreThan12Months: false,
  });

  // Tenant-specific state
  const [tenantTypes, setTenantTypes] = useState({
    'Tech Companies': false,
    'Retail Chains': false,
    'Manufacturing': false,
    'Healthcare': false,
    'Professional Services': false,
  });
  const [spaceRequirements, setSpaceRequirements] = useState({
    '0-5,000 SF': false,
    '5,000-10,000 SF': false,
    '10,000-25,000 SF': false,
    '25,000+ SF': false,
  });
  const [leaseTerm, setLeaseTerm] = useState({
    '0-1 years': false,
    '1-3 years': false,
    '3-5 years': false,
    '5+ years': false,
  });

  // Buyer-specific state
  const [investmentTypes, setInvestmentTypes] = useState({
    'Core': false,
    'Core Plus': false,
    'Value Add': false,
    'Opportunistic': false,
  });
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [propertyAge, setPropertyAge] = useState({
    '0-5 years': false,
    '5-10 years': false,
    '10-20 years': false,
    '20+ years': false,
  });

  const locations = [
    { county: 'King County', submarkets: ['Seattle', 'Bellevue', 'Redmond', 'Kirkland'] },
    { county: 'Pierce County', submarkets: ['Tacoma', 'Lakewood', 'Puyallup'] },
    { county: 'Snohomish County', submarkets: ['Everett', 'Lynnwood', 'Bothell'] },
  ];

  const handleLocationChange = (event) => {
    const { value: currentSelectedValues } = event.target;
    let newSelectedSet = new Set(selectedLocations);

    const selectedNow = new Set(currentSelectedValues);
    const explicitlyAdded = [...selectedNow].filter(item => !newSelectedSet.has(item));
    const explicitlyRemoved = [...newSelectedSet].filter(item => !selectedNow.has(item));

    locations.forEach(countyObj => {
      if (explicitlyAdded.includes(countyObj.county)) {
        newSelectedSet.add(countyObj.county);
        countyObj.submarkets.forEach(sub => newSelectedSet.add(sub));
      } else if (explicitlyRemoved.includes(countyObj.county)) {
        newSelectedSet.delete(countyObj.county);
        countyObj.submarkets.forEach(sub => newSelectedSet.delete(sub));
      } else {
        const submarketsAdded = countyObj.submarkets.filter(sub => explicitlyAdded.includes(sub));
        const submarketsRemoved = countyObj.submarkets.filter(sub => explicitlyRemoved.includes(sub));

        if (submarketsAdded.length > 0) {
          submarketsAdded.forEach(sub => newSelectedSet.add(sub));
          const allSubmarketsAreSelected = countyObj.submarkets.every(sub => newSelectedSet.has(sub));
          if (allSubmarketsAreSelected) {
            newSelectedSet.add(countyObj.county);
          }
        }
        if (submarketsRemoved.length > 0) {
          submarketsRemoved.forEach(sub => newSelectedSet.delete(sub));
          const allSubmarketsAreSelected = countyObj.submarkets.every(sub => newSelectedSet.has(sub));
          if (!allSubmarketsAreSelected && newSelectedSet.has(countyObj.county)) {
            newSelectedSet.delete(countyObj.county);
          }
        }
      }
    });

    setSelectedLocations(Array.from(newSelectedSet));
  };

  const handleClearAll = () => {
    setSavedView('default');
    setSelectedLocations([]);
    
    if (selectedRole === 'properties') {
      setScore(70);
      setPropertyTypes({
        Office: false,
        Industrial: false,
        Retail: false,
        Multifamily: false,
        Land: false,
      });
      setLeaseExpiryOptions({
        lessThan6Months: false,
        sixToTwelveMonths: false,
        moreThan12Months: false,
      });
    } else if (selectedRole === 'tenant') {
      setTenantTypes({
        'Tech Companies': false,
        'Retail Chains': false,
        'Manufacturing': false,
        'Healthcare': false,
        'Professional Services': false,
      });
      setSpaceRequirements({
        '0-5,000 SF': false,
        '5,000-10,000 SF': false,
        '10,000-25,000 SF': false,
        '25,000+ SF': false,
      });
      setLeaseTerm({
        '0-1 years': false,
        '1-3 years': false,
        '3-5 years': false,
        '5+ years': false,
      });
    } else if (selectedRole === 'buyer') {
      setInvestmentTypes({
        'Core': false,
        'Core Plus': false,
        'Value Add': false,
        'Opportunistic': false,
      });
      setPriceRange([0, 100000000]);
      setPropertyAge({
        '0-5 years': false,
        '5-10 years': false,
        '10-20 years': false,
        '20+ years': false,
      });
    }
  };

  const renderPropertiesFilters = () => (
    <>
      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Asset Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FormGroup>
            {Object.entries(propertyTypes).map(([type, checked]) => (
              <FormControlLabel
                key={type}
                control={
                  <StyledCheckbox
                    checked={checked}
                    onChange={() => setPropertyTypes(prev => ({ ...prev, [type]: !checked }))}
                    size="small"
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Score ≥ <Typography component="span" sx={{ fontWeight: 400 }}>{score}</Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <StyledSlider
            value={score}
            onChange={(e, newValue) => setScore(newValue)}
            aria-labelledby="score-slider"
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Lease Expiry ≥
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FormGroup>
            {Object.entries(leaseExpiryOptions).map(([option, checked]) => (
              <FormControlLabel
                key={option}
                control={
                  <StyledCheckbox
                    checked={checked}
                    onChange={() => setLeaseExpiryOptions(prev => ({ ...prev, [option]: !checked }))}
                    size="small"
                  />
                }
                label={option === 'lessThan6Months' ? '< 6 months' :
                       option === 'sixToTwelveMonths' ? '6-12 months' : '> 12 months'}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );

  const renderTenantFilters = () => (
    <>
      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Tenant Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FormGroup>
            {Object.entries(tenantTypes).map(([type, checked]) => (
              <FormControlLabel
                key={type}
                control={
                  <StyledCheckbox
                    checked={checked}
                    onChange={() => setTenantTypes(prev => ({ ...prev, [type]: !checked }))}
                    size="small"
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Space Requirements
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FormGroup>
            {Object.entries(spaceRequirements).map(([range, checked]) => (
              <FormControlLabel
                key={range}
                control={
                  <StyledCheckbox
                    checked={checked}
                    onChange={() => setSpaceRequirements(prev => ({ ...prev, [range]: !checked }))}
                    size="small"
                  />
                }
                label={range}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Lease Term
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FormGroup>
            {Object.entries(leaseTerm).map(([term, checked]) => (
              <FormControlLabel
                key={term}
                control={
                  <StyledCheckbox
                    checked={checked}
                    onChange={() => setLeaseTerm(prev => ({ ...prev, [term]: !checked }))}
                    size="small"
                  />
                }
                label={term}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );

  const renderBuyerFilters = () => (
    <>
      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Investment Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FormGroup>
            {Object.entries(investmentTypes).map(([type, checked]) => (
              <FormControlLabel
                key={type}
                control={
                  <StyledCheckbox
                    checked={checked}
                    onChange={() => setInvestmentTypes(prev => ({ ...prev, [type]: !checked }))}
                    size="small"
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <StyledSlider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100000000}
            valueLabelFormat={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Property Age
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FormGroup>
            {Object.entries(propertyAge).map(([age, checked]) => (
              <FormControlLabel
                key={age}
                control={
                  <StyledCheckbox
                    checked={checked}
                    onChange={() => setPropertyAge(prev => ({ ...prev, [age]: !checked }))}
                    size="small"
                  />
                }
                label={age}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );

  return (
    <Box sx={{ 
      p: 2, 
      flex: 1, 
      overflowY: 'auto',
      background: `linear-gradient(145deg, ${theme.palette.background.default}, ${theme.palette.grey[50]})`,
      borderRadius: theme.shape.borderRadius * 2,
    }}>
      {/* Saved Views */}
      <Box sx={{ 
        mb: 3,
        p: 2,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: theme.shape.borderRadius * 2,
        boxShadow: theme.shadows[1],
      }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          Saved Views
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="saved-view-label">Select View</InputLabel>
          <StyledSelect
            labelId="saved-view-label"
            id="saved-view-select"
            value={savedView}
            onChange={(e) => setSavedView(e.target.value)}
            label="Select View"
          >
            <MenuItem value="default">Default View</MenuItem>
            <MenuItem value="custom1">Custom View 1</MenuItem>
            <MenuItem value="custom2">Custom View 2</MenuItem>
          </StyledSelect>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2, opacity: 0.5 }} />

      {/* Location Filter */}
      <StyledAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Location
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="location-select-label">Select Location</InputLabel>
            <StyledSelect
              labelId="location-select-label"
              id="location-select"
              multiple
              value={selectedLocations}
              onChange={handleLocationChange}
              label="Select Location"
              renderValue={(selected) => selected.join(', ')}
            >
              {locations.map((location) => [
                <MenuItem
                  key={location.county}
                  value={location.county}
                  sx={{
                    fontWeight: 600,
                    bgcolor: selectedLocations.includes(location.county) ? theme.palette.primary.light : 'inherit',
                    '&:hover': {
                      bgcolor: theme.palette.primary.light,
                    },
                  }}
                >
                  {location.county}
                </MenuItem>,
                location.submarkets.map((submarket) => (
                  <MenuItem
                    key={submarket}
                    value={submarket}
                    sx={{
                      ml: 2,
                      bgcolor: selectedLocations.includes(submarket) ? theme.palette.primary.light : 'inherit',
                      '&:hover': {
                        bgcolor: theme.palette.primary.light,
                      },
                    }}
                  >
                    {submarket}
                  </MenuItem>
                )),
              ])}
            </StyledSelect>
          </FormControl>
        </AccordionDetails>
      </StyledAccordion>

      <Divider sx={{ my: 2, opacity: 0.5 }} />

      {/* Role-specific filters */}
      {selectedRole === 'properties' && renderPropertiesFilters()}
      {selectedRole === 'tenant' && renderTenantFilters()}
      {selectedRole === 'buyer' && renderBuyerFilters()}

      <Divider sx={{ my: 2, opacity: 0.5 }} />

      <GradientButton 
        fullWidth 
        onClick={handleClearAll}
        sx={{ mt: 2 }}
      >
        Clear All Filters
      </GradientButton>
    </Box>
  );
};

export default FilterPanel; 