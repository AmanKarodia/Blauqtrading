require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
const { sendLogisticsEmail } = require('./utils/sendEmail');
const { verifyToken, checkRole } = require('./middleware/auth');
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const app = express();
app.use(cors());
app.use(express.json());

// Submit logistics request
app.post('/api/logistics', verifyToken, async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('logistics_requests').add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'Pending',
    });
    await sendLogisticsEmail(data);
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit logistics request' });
  }
});

// Get all logistics requests (admin only)
app.get('/api/logistics', verifyToken, checkRole(['admin', 'manager']), async (req, res) => {
  const snapshot = await db.collection('logistics_requests').orderBy('createdAt', 'desc').get();
  const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(requests);
});

app.get('/api/test', (req, res) => {
  res.json({ message: '✅ API test passed' });
});

// Update status & write audit log
app.post('/api/logistics/:id/status', verifyToken, checkRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  const adminId = req.user.uid;

  try {
    const ref = db.collection('logistics_requests').doc(id);
    await ref.update({ status: newStatus });

    await db.collection('admin_audit_logs').add({
      requestId: id,
      newStatus,
      adminId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Health check
app.get('/', (req, res) => res.send('Logistics Backend API Running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));