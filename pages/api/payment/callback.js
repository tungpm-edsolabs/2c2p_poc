export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function handlePost(req, res) {
  console.log(req.body);
  return res.status(200).send('OK');
}
