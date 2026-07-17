import { getDbPool } from '@/lib/db';
import { logToCloudWatch } from '@/lib/logger';

export async function GET() {
  console.log('🔍 API route called');
  
  try {
    console.log('📤 About to call logToCloudWatch');
    await logToCloudWatch('📊 Dashboard API called');
    console.log('✅ logToCloudWatch completed');
    
    const pool = await getDbPool();
    
    // Fetch metrics
    const metricsResult = await pool.query('SELECT * FROM dashboard_metrics');
    
    // Fetch pods
    const podsResult = await pool.query('SELECT * FROM dashboard_pods');
    
    // Fetch deployments
    const deploymentsResult = await pool.query('SELECT * FROM dashboard_deployments');
    
    // Fetch activities
    const activitiesResult = await pool.query('SELECT * FROM dashboard_activities ORDER BY created_at DESC LIMIT 10');

    console.log('✅ API returning data successfully');
    return Response.json({
      metrics: metricsResult.rows,
      pods: podsResult.rows,
      deployments: deploymentsResult.rows,
      activities: activitiesResult.rows,
    });
  } catch (error) {
    console.error('❌ API error:', error);
    return Response.json({ error: 'Database error' }, { status: 500 });
  }
}