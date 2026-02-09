
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cargoValue, origin, destination, transportType, riskType } = req.body;

    const response = await fetch(
      'https://cargoinsureonline.com/api/get-cargo-insurance-rates',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CARGO_API_KEY
        },
        body: JSON.stringify({
          cargo_value: cargoValue,
          origin_country: origin,
          destination_country: destination,
          transport_type: transportType,
          risk_type: riskType || 'All Risk',
          currency: 'USD'
        })
      }
    );

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: 'Quote failed' });
  }
}
