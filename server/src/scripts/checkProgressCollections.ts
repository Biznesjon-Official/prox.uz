import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const checkProgressCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Check studentprogresses collection
    console.log('\n📊 STUDENTPROGRESSES COLLECTION:')
    const studentProgressesCol = mongoose.connection.db.collection('studentprogresses')
    const studentProgresses = await studentProgressesCol.find({}).limit(10).toArray()
    
    console.log(`Jami: ${await studentProgressesCol.countDocuments()} ta ma'lumot`)
    console.log('\nBirinchi 5 ta namuna:')
    studentProgresses.slice(0, 5).forEach((doc, index) => {
      console.log(`\n${index + 1}. ID: ${doc._id}`)
      Object.keys(doc).forEach(key => {
        if (key !== '_id' && key !== '__v') {
          console.log(`   ${key}: ${doc[key]}`)
        }
      })
      console.log('   ' + '-'.repeat(40))
    })

    // Check realprogresses collection
    console.log('\n📈 REALPROGRESSES COLLECTION:')
    const realProgressesCol = mongoose.connection.db.collection('realprogresses')
    const realProgresses = await realProgressesCol.find({}).limit(10).toArray()
    
    console.log(`Jami: ${await realProgressesCol.countDocuments()} ta ma'lumot`)
    console.log('\nBirinchi 5 ta namuna:')
    realProgresses.slice(0, 5).forEach((doc, index) => {
      console.log(`\n${index + 1}. ID: ${doc._id}`)
      Object.keys(doc).forEach(key => {
        if (key !== '_id' && key !== '__v') {
          console.log(`   ${key}: ${doc[key]}`)
        }
      })
      console.log('   ' + '-'.repeat(40))
    })

    // Check payments collection for student info
    console.log('\n💰 PAYMENTS COLLECTION:')
    const paymentsCol = mongoose.connection.db.collection('payments')
    const payments = await paymentsCol.find({}).limit(5).toArray()
    
    console.log(`Jami: ${await paymentsCol.countDocuments()} ta ma'lumot`)
    console.log('\nBirinchi 5 ta namuna:')
    payments.forEach((doc, index) => {
      console.log(`\n${index + 1}. ID: ${doc._id}`)
      Object.keys(doc).forEach(key => {
        if (key !== '_id' && key !== '__v') {
          console.log(`   ${key}: ${doc[key]}`)
        }
      })
      console.log('   ' + '-'.repeat(40))
    })

    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

checkProgressCollections()