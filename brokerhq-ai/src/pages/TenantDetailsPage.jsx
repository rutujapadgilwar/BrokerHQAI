import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Container,
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Star as StarIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Timeline as TimelineIcon,
  EmojiEvents as TrophyIcon,
  Group as GroupIcon,
  MonetizationOn as MonetizationIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/dashboard/Navbar';

// Styled components
const HeaderContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  marginTop: '64px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 100 100\\"><defs><pattern id=\\"grid\\" width=\\"10\\" height=\\"10\\" patternUnits=\\"userSpaceOnUse\\"><path d=\\"M 10 0 L 0 0 0 10\\" fill=\\"none\\" stroke=\\"rgba(255,255,255,0.1)\\" stroke-width=\\"1\\"/></pattern></defs><rect width=\\"100\\" height=\\"100\\" fill=\\"url(%23grid)\\"/></svg>")',
    opacity: 0.3,
  },
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: 1200,
  margin: '0 auto',
}));

const OpportunityScore = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: 20,
  padding: theme.spacing(3),
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
}));

const ScoreBadge = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: 1,
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid #e2e8f0',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const CardIcon = styled(Box)(({ theme, variant }) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  color: 'white',
  background: variant === 'opportunity' ? 'linear-gradient(45deg, #ff6b6b, #ee5a52)' :
              variant === 'timeline' ? 'linear-gradient(45deg, #4facfe, #00f2fe)' :
              variant === 'strategy' ? 'linear-gradient(45deg, #a8e6cf, #3d8b85)' :
              variant === 'contacts' ? 'linear-gradient(45deg, #4ecdc4, #44a08d)' :
              'linear-gradient(45deg, #667eea, #764ba2)',
}));

const OpportunityHighlight = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
  color: 'white',
  borderRadius: 16,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

const DetailItem = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(2),
  borderRadius: 8,
}));

const TriggerItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 12,
  background: '#fff5f5',
  borderLeft: '4px solid #e53e3e',
  marginBottom: theme.spacing(2),
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: '1px solid #f1f5f9',
}));

const TimelineDate = styled(Box)(({ theme }) => ({
  background: '#667eea',
  color: 'white',
  padding: theme.spacing(1),
  borderRadius: 8,
  fontWeight: 600,
  minWidth: 100,
  textAlign: 'center',
}));

const ContactPerson = styled(Box)(({ theme }) => ({
  background: '#f8fafc',
  padding: theme.spacing(3),
  borderRadius: 12,
  marginBottom: theme.spacing(2),
}));

const CommissionHighlight = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffd89b, #19547b)',
  color: 'white',
  padding: theme.spacing(3),
  borderRadius: 12,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const CTAButton = styled(Button)(({ theme, variant }) => ({
  width: '100%',
  background: variant === 'secondary' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
  color: 'white',
  padding: theme.spacing(2, 4),
  borderRadius: 12,
  fontWeight: 600,
  fontSize: '1.1rem',
  textTransform: 'none',
  marginTop: theme.spacing(2),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: variant === 'secondary' ? '0 8px 25px rgba(102, 126, 234, 0.4)' : '0 8px 25px rgba(255, 107, 107, 0.4)',
  },
}));

// Mock data for tenant details
const mockTenantData = {
  id: 1,
  company: 'TechFlow Dynamics',
  stage: 'Series B Growth Stage',
  employees: 90,
  growth: 'Rapid Expansion Mode',
  currentSpace: '15.5K SF, 1200 Market St',
  leaseExpiry: 'Q4 2025 (8 months)',
  growthRate: '34% headcount increase',
  budget: '$1.5M-$2.5M annually',
  opportunityScore: 91,
  commissionValue: '$375K-$625K',
  decisionTimeline: 'Next 90 Days',
  spaceRequirements: '25K-35K SF',
  winProbability: 'High (First Contact)',
  contacts: [
    {
      name: 'Sarah Kim',
      role: 'CEO',
      authority: 'Broker Selection Authority',
      phone: '(415) 555-0234',
      email: 'sarah@techflow.com',
      focus: 'Company culture, employee retention',
      style: 'Strategic, values long-term partnerships',
      bestContact: 'Tuesday-Thursday, 10-12 PM',
      keyConcern: 'Maintaining culture during rapid growth',
      avatar: 'SK',
    },
    {
      name: 'Mike Chen',
      role: 'CFO',
      authority: 'Budget & Process Oversight',
      phone: '(415) 555-0235',
      email: 'mike@techflow.com',
      focus: 'Cost efficiency, process management',
      style: 'Detail-oriented, wants clear ROI',
      bestContact: 'Monday-Wednesday, 2-4 PM',
      keyConcern: 'Managing costs while scaling efficiently',
      avatar: 'MC',
    },
  ],
  urgencyTriggers: [
    {
      icon: '📏',
      title: 'Space crisis: 180 SF/employee (severely overcrowded)',
      detail: 'Industry standard is 200-250 SF/employee',
    },
    {
      icon: '📈',
      title: 'Hiring surge: 23 open positions = 25% more staff',
      detail: 'Current space will become impossible in 90 days',
    },
    {
      icon: '⏰',
      title: 'Lease expires Q4 2025 - must start search NOW',
      detail: 'Need 6-month lead time for buildout',
    },
    {
      icon: '💼',
      title: 'No current broker - open opportunity',
      detail: 'First broker to approach has major advantage',
    },
  ],
  timeline: [
    { date: 'NOW', title: 'Broker Selection Phase', detail: 'Space crisis building, starting to think about broker needs' },
    { date: 'Jan 2025', title: 'Requirement Definition', detail: 'Finalizing space needs, budget, and must-haves with broker' },
    { date: 'Feb-Mar 2025', title: 'Active Space Search', detail: 'Touring properties, evaluating options, narrowing choices' },
    { date: 'Apr 2025', title: 'Lease Negotiation', detail: 'LOI, due diligence, final lease negotiations' },
    { date: 'May-Oct 2025', title: 'Buildout & Move', detail: 'Design, construction, move-in before Q4 lease expiration' },
  ],
  actionSteps: [
    { number: 1, title: 'Contact CEO with growth/space strategy angle', detail: 'Position as advisor, not salesperson - focus on their success' },
    { number: 2, title: 'Present market analysis and space strategy', detail: 'Show deep market knowledge and understanding of their needs' },
    { number: 3, title: 'Demonstrate process and timeline expertise', detail: 'Show how you\'ll manage the entire process seamlessly' },
    { number: 4, title: 'Secure broker representation agreement', detail: 'Position as strategic partnership for their growth' },
  ],
};

const TenantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // In a real app, you would fetch tenant data based on the ID
    // For now, we'll use mock data
    setTenant(mockTenantData);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading tenant details...</Typography>
      </Box>
    );
  }

  if (!tenant) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Tenant not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Navbar />
      {/* Header */}
      <HeaderContainer>
        <HeaderContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {tenant.company}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                {tenant.stage} • {tenant.employees} Employees • {tenant.growth}
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon />
                    <Typography><strong>Current:</strong> {tenant.currentSpace}</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScheduleIcon />
                    <Typography><strong>Lease Expires:</strong> {tenant.leaseExpiry}</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUpIcon />
                    <Typography><strong>Growth:</strong> {tenant.growthRate}</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MoneyIcon />
                    <Typography><strong>Budget:</strong> {tenant.budget}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <OpportunityScore>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 1, color: '#ffd700' }}>
                {tenant.opportunityScore}
              </Typography>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
                Rep Opportunity
              </Typography>
              <ScoreBadge label="🔥 HOT PROSPECT" />
            </OpportunityScore>
          </Box>
        </HeaderContent>
      </HeaderContainer>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'grid', gap: 4 }}>
              
              {/* Rep Opportunity Analysis */}
              <StyledCard>
                <CardHeader
                  avatar={
                    <CardIcon variant="opportunity">
                      🔥
                    </CardIcon>
                  }
                  title="Why They Need a Tenant Rep NOW"
                  titleTypographyProps={{ variant: 'h5', fontWeight: 700 }}
                />
                <CardContent>
                  <OpportunityHighlight>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      🎯 PERFECT TENANT REP OPPORTUNITY
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <DetailItem>
                          <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                            Commission Value
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {tenant.commissionValue}
                          </Typography>
                        </DetailItem>
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem>
                          <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                            Decision Timeline
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {tenant.decisionTimeline}
                          </Typography>
                        </DetailItem>
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem>
                          <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                            Space Requirements
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {tenant.spaceRequirements}
                          </Typography>
                        </DetailItem>
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem>
                          <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                            Win Probability
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {tenant.winProbability}
                          </Typography>
                        </DetailItem>
                      </Grid>
                    </Grid>
                    <Box sx={{ background: 'rgba(255, 255, 255, 0.1)', p: 2, borderRadius: 1, mt: 2 }}>
                      <Typography sx={{ fontWeight: 600 }}>
                        Why This is a Great Rep Opportunity:
                      </Typography>
                      <Typography>
                        Growing company + lease expiration + no current broker relationship = perfect timing to win their business
                      </Typography>
                    </Box>
                  </OpportunityHighlight>

                  {/* Urgency Triggers */}
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Urgency Triggers
                  </Typography>
                  {tenant.urgencyTriggers.map((trigger, index) => (
                    <TriggerItem key={index}>
                      <Typography variant="h6" sx={{ color: '#e53e3e' }}>
                        {trigger.icon}
                      </Typography>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          {trigger.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {trigger.detail}
                        </Typography>
                      </Box>
                    </TriggerItem>
                  ))}

                  <Box sx={{ background: '#f0fff4', p: 3, borderRadius: 2, borderLeft: '4px solid #38a169', mt: 3 }}>
                    <Typography variant="h6" sx={{ color: '#38a169', mb: 1 }}>
                      🎯 PREDICTION: They'll hire a broker in next 30-60 days
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      Space pressure + lease timeline = immediate broker need
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
                      First broker to present comprehensive strategy wins the engagement
                    </Typography>
                  </Box>

                  <CTAButton variant="contained" sx={{ mt: 3 }}>
                    📞 CONTACT FOR REP OPPORTUNITY
                  </CTAButton>
                </CardContent>
              </StyledCard>

              {/* Search Timeline & Strategy */}
              <StyledCard>
                <CardHeader
                  avatar={
                    <CardIcon variant="timeline">
                      📅
                    </CardIcon>
                  }
                  title="Their Space Search Timeline"
                  titleTypographyProps={{ variant: 'h5', fontWeight: 700 }}
                />
                <CardContent>
                  {tenant.timeline.map((item, index) => (
                    <TimelineItem key={index}>
                      <TimelineDate>
                        {item.date}
                      </TimelineDate>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          {item.detail}
                        </Typography>
                      </Box>
                    </TimelineItem>
                  ))}

                  <Box sx={{ background: 'linear-gradient(135deg, #a8e6cf, #3d8b85)', color: 'white', p: 3, borderRadius: 2, my: 3, fontStyle: 'italic' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      💬 WINNING REP PITCH
                    </Typography>
                    <Typography>
                      "Sarah, I've been tracking TechFlow's growth and see you're approaching a critical space decision. With your lease expiring and 25% more staff coming, the next 90 days are crucial for securing the right space. I specialize in helping growth-stage tech companies navigate this exact transition. Should we schedule 30 minutes to discuss your space strategy?"
                    </Typography>
                  </Box>

                  <Typography variant="h6" sx={{ mb: 2 }}>
                    🚀 YOUR ACTION PLAN TO WIN THE REP
                  </Typography>
                  <List>
                    {tenant.actionSteps.map((step, index) => (
                      <ListItem key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, mb: 1.5, bgcolor: '#f8fafc', borderRadius: 1, borderLeft: '4px solid #667eea' }}>
                        <Avatar sx={{ bgcolor: '#667eea', width: 32, height: 32, fontSize: '0.9rem', fontWeight: 600 }}>
                          {step.number}
                        </Avatar>
                        <ListItemText
                          primary={step.title}
                          secondary={step.detail}
                          primaryTypographyProps={{ fontWeight: 600 }}
                          secondaryTypographyProps={{ color: '#64748b' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ background: '#fff5f5', color: '#c53030', p: 2, borderRadius: 1, mt: 3, borderLeft: '4px solid #e53e3e', fontWeight: 600 }}>
                    ⚠️ URGENCY: Other tenant reps will discover this opportunity soon - first contact advantage critical
                  </Box>
                </CardContent>
              </StyledCard>

              {/* Win Strategy */}
              <StyledCard>
                <CardHeader
                  avatar={
                    <CardIcon variant="strategy">
                      🏆
                    </CardIcon>
                  }
                  title="How to WIN This Tenant Rep"
                  titleTypographyProps={{ variant: 'h5', fontWeight: 700 }}
                />
                <CardContent>
                  <Box sx={{ background: '#e6fffa', p: 3, borderRadius: 2, mb: 3, borderLeft: '4px solid #38b2ac' }}>
                    <Typography variant="h6" sx={{ color: '#234e52', mb: 2 }}>
                      🎯 YOUR COMPETITIVE ADVANTAGES
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      • <strong>Timing:</strong> You can reach them before they start broker selection<br />
                      • <strong>Market Knowledge:</strong> Show deep understanding of tech space needs<br />
                      • <strong>Process Expertise:</strong> Demonstrate smooth move management<br />
                      • <strong>No Competition:</strong> First broker to approach has huge advantage
                    </Typography>
                  </Box>

                  <Box sx={{ background: '#fffbeb', p: 3, borderRadius: 2, mb: 3, borderLeft: '4px solid #f59e0b' }}>
                    <Typography variant="h6" sx={{ color: '#92400e', mb: 2 }}>
                      💡 KEY SUCCESS FACTORS
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      • <strong>Lead with Strategy:</strong> Focus on their growth challenges, not commissions<br />
                      • <strong>Show Market Intel:</strong> Demonstrate knowledge of available spaces<br />
                      • <strong>Process Confidence:</strong> Highlight experience with similar companies<br />
                      • <strong>Timeline Urgency:</strong> Emphasize need to start process now
                    </Typography>
                  </Box>

                  <Box sx={{ background: '#fff5f5', p: 3, borderRadius: 2, borderLeft: '4px solid #e53e3e' }}>
                    <Typography variant="h6" sx={{ color: '#c53030', mb: 2 }}>
                      ⚠️ COMMON MISTAKES TO AVOID
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      • Don't lead with commission savings<br />
                      • Don't overwhelm with too many options initially<br />
                      • Don't underestimate their timeline pressure<br />
                      • Don't ignore their employee retention concerns
                    </Typography>
                  </Box>

                  <Box sx={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', p: 3, borderRadius: 2, mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      🎯 POSITIONING STRATEGY
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      Position yourself as the <strong>"Growth Stage Space Strategist"</strong> who helps tech companies navigate expansion moves. Focus on employee retention, culture preservation, and seamless transitions during critical growth phases.
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'grid', gap: 3, height: 'fit-content', position: 'sticky', top: 32 }}>
              
              {/* Decision Makers */}
              <StyledCard>
                <CardHeader
                  avatar={
                    <CardIcon variant="contacts">
                      👥
                    </CardIcon>
                  }
                  title="Key Decision Makers"
                  titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
                />
                <CardContent>
                  {tenant.contacts.map((contact, index) => (
                    <ContactPerson key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ width: 60, height: 60, bgcolor: '#667eea', fontWeight: 600, fontSize: '1.2rem' }}>
                          {contact.avatar}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.5 }}>
                            {contact.name}, {contact.role}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                            {contact.authority}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                        📞 {contact.phone} | ✉️ {contact.email}<br />
                        🎯 <strong>Focus:</strong> {contact.focus}<br />
                        💡 <strong>Style:</strong> {contact.style}<br />
                        ⏰ <strong>Best Contact:</strong> {contact.bestContact}<br />
                        🔑 <strong>Key Concern:</strong> "{contact.keyConcern}"
                      </Typography>
                    </ContactPerson>
                  ))}
                  <CTAButton variant="secondary">
                    📞 Contact Sarah Kim
                  </CTAButton>
                </CardContent>
              </StyledCard>

              {/* Commission Opportunity */}
              <StyledCard>
                <CardHeader
                  avatar={
                    <Box sx={{ background: 'linear-gradient(45deg, #ffd89b, #19547b)', width: 48, height: 48, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }}>
                      💰
                    </Box>
                  }
                  title="Commission Opportunity"
                  titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
                />
                <CardContent>
                  <CommissionHighlight>
                    <Typography sx={{ fontWeight: 600, mb: 2 }}>
                      💰 TOTAL COMMISSION VALUE
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {tenant.commissionValue}
                    </Typography>
                    <Typography variant="body2">
                      Based on 25K-35K SF at $50-70/SF
                    </Typography>
                  </CommissionHighlight>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#667eea', mb: 0.5 }}>
                          $2M
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          Annual Rent Budget
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#667eea', mb: 0.5 }}>
                          5-7 years
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          Likely Lease Term
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#667eea', mb: 0.5 }}>
                          30-45
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          Days to Win Rep
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ background: '#f0fff4', p: 2, borderRadius: 1, borderLeft: '4px solid #38a169' }}>
                    <Typography sx={{ fontWeight: 600, color: '#2f855a' }}>
                      🎯 DEAL VALUE: High-value tenant rep opportunity with excellent timing
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TenantDetailsPage; 