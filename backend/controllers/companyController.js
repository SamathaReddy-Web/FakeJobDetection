export const verifyCompany = async (req, res) => {
  try {
    const { name, website } = req.body;

    if (!name || !website) {
      return res.status(400).json({ message: 'Please provide company name and website' });
    }

    // Mock logic for Domain age and email existence check
    // In a real scenario we'd query WHOIS APIs
    let trustScore = 100;
    const flags = [];

    const isHttpOnly = website.startsWith('http://');
    if (isHttpOnly) {
      trustScore -= 30;
      flags.push('Website lacks SSL (HTTPS)');
    }

    const freeDomains = ['.in', '.tk', '.xyz', '.site'];
    if (freeDomains.some(domain => website.includes(domain))) {
       trustScore -= 20;
       flags.push('Company uses a cheap or commonly abused Top-Level Domain');
    }

    if (name.toLowerCase().includes('global') || name.toLowerCase().includes('enterprise')) {
       // Just a heuristic check for overly generic names
       trustScore -= 5;
    }

    trustScore = Math.max(0, trustScore);
    
    let label = 'Trusted';
    if (trustScore < 50) label = 'Risky';
    if (trustScore < 20) label = 'Fake / Untrusted';

    res.json({
      trustScore,
      flags,
      label
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
