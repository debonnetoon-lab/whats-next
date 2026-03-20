import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const sendLeadNotification = async (lead) => {
  if (!resend) {
    console.log('Mock Email: Lead notification would be sent to info@whatsnext.be');
    return;
  }
  try {
    await resend.emails.send({
      from: 'Whatsnext Automations <onboarding@resend.dev>',
      to: 'info@whatsnext.be',
      subject: `Nieuwe Lead: ${lead.name} (${lead.company})`,
      html: `
        <h3>Nieuwe Lead Details</h3>
        <p><strong>Naam:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Bedrijf:</strong> ${lead.company}</p>
        <p><strong>Bron:</strong> ${lead.lead_source}</p>
        <p><strong>Bericht:</strong> ${lead.message || 'Geen bericht'}</p>
      `
    });
  } catch (error) {
    console.error('Email Error (Lead):', error);
  }
};

export const sendScanResults = async (email, score, level, recommendations) => {
  if (!resend) {
    console.log(`Mock Email: Scan results would be sent to ${email}`);
    return;
  }
  try {
    await resend.emails.send({
      from: 'Whatsnext AI <onboarding@resend.dev>',
      to: email,
      subject: 'Jouw AI Maturity Scan Resultaten',
      html: `
        <h1>Jouw AI Maturity Score: ${score}/100</h1>
        <p>Je bedrijf bevindt zich op het niveau: <strong>${level}</strong></p>
        <h3>Onze Aanbevelingen:</h3>
        <ul>
          ${recommendations.map(r => `<li>${r}</li>`).join('')}
        </ul>
        <hr>
        <p>Wil je deze resultaten bespreken? <a href="https://calendly.com/whatsnext">Plan hier een gratis strategiegesprek.</a></p>
      `
    });
  } catch (error) {
    console.error('Email Error (Scan):', error);
  }
};

export const sendROIReportEmail = async (email, company, score, roi) => {
  if (!resend) {
    console.log(`Mock Email: ROI Report notification would be sent to ${email}`);
    return;
  }
  try {
    await resend.emails.send({
      from: 'Whatsnext AI <onboarding@resend.dev>',
      to: email,
      subject: 'Jouw AI Opportunity Report is klaar',
      html: `
        <h1>AI Strategie Rapport voor ${company}</h1>
        <p>Bedankt voor je interesse. Je rapport is gegenereerd op basis van jouw input:</p>
        <ul>
          <li><strong>AI Maturity Score:</strong> ${score}/100</li>
          <li><strong>Geschatte ROI per jaar:</strong> €${Number(roi).toLocaleString('nl-BE')}</li>
        </ul>
        <p>Wil je direct starten met het verzilveren van deze winst?</p>
        <p><a href="https://calendly.com/whatsnext" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:8px;">Plan een gratis strategiegesprek</a></p>
        <p>Met vriendelijke groet,<br>Het Whatsnext AI Team</p>
      `
    });
  } catch (error) {
    console.error('Email Error (ROI Report):', error);
  }
};
