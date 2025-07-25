const express = require('express');
const sendEmails = require('../services/emailService');

module.exports = (db) => {
  const router = express.Router();

  // Create logistics request
  router.post('/create', async (req, res) => {
    const data = req.body;
    if (!data.name || !data.email) return res.status(400).json({ error: 'Missing required fields' });

    try {
      const docRef = await db.collection('logistics_requests').add({
        ...data,
        status: 'Pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      await sendEmails.newRequest(data);
      return res.status(201).json({ success: true, id: docRef.id });
    } catch (err) {
      console.error('❌ Error creating request:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update logistics status
  router.post('/update-status/:id', async (req, res) => {
    const id = req.params.id;
    const { newStatus, userId } = req.body;

    if (!newStatus) return res.status(400).json({ error: 'Missing status' });

    try {
      const ref = db.collection('logistics_requests').doc(id);
      const doc = await ref.get();
      if (!doc.exists) return res.status(404).json({ error: 'Request not found' });

      const data = doc.data();
      await ref.update({ status: newStatus });

      await sendEmails.statusUpdate(data.email, data.name, newStatus);

      await db.collection('admin_audit_logs').add({
        requestId: id,
        updatedBy: userId || 'system',
        newStatus,
        previousStatus: data.status,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.json({ success: true });
    } catch (err) {
      console.error('❌ Failed to update status:', err);
      return res.status(500).json({ error: 'Failed to update status' });
    }
  });

  return router;
};