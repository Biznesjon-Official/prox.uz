import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.production' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://CRM_group_12coder:HxFIrM4Ge66tde9Z@cluster1.viyjahc.mongodb.net/prox_crm?retryWrites=true&w=majority';

async function testMentorLogin() {
  try {
    console.log('🔄 MongoDB ga ulanish...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB ulandi\n');

    const db = mongoose.connection.db;
    const branchesCollection = db.collection('branches');

    // Mentor01 ni qidirish
    const mentorBranch = await branchesCollection.findOne({ 
      mentor_username: 'Mentor01' 
    });
    
    console.log('🔍 Mentor01 qidirilmoqda...');
    console.log('📋 Topilgan mentor branch:', mentorBranch ? 'TOPILDI' : 'TOPILMADI');
    
    if (mentorBranch) {
      console.log('\n✅ Mentor ma\'lumotlari:');
      console.log(`   ID: ${mentorBranch._id}`);
      console.log(`   Branch: ${mentorBranch.name}`);
      console.log(`   Username: ${mentorBranch.mentor_username}`);
      console.log(`   Password: ${mentorBranch.mentor_password}`);
      
      // Parol tekshirish
      const isPasswordMatch = mentorBranch.mentor_password === 'Mentor01';
      console.log(`   Parol to'g'ri: ${isPasswordMatch ? 'HA' : 'YO\'Q'}`);
    }

    // Case-sensitive test
    console.log('\n🔍 Case-sensitive test:');
    const testCases = ['Mentor01', 'mentor01', 'MENTOR01'];
    
    for (const testUsername of testCases) {
      const found = await branchesCollection.findOne({ 
        mentor_username: testUsername 
      });
      console.log(`   ${testUsername}: ${found ? 'TOPILDI' : 'TOPILMADI'}`);
    }

    await mongoose.disconnect();
    console.log('\n✅ MongoDB uzilib qoldi');
  } catch (error) {
    console.error('❌ Xatolik:', error);
    process.exit(1);
  }
}

testMentorLogin();