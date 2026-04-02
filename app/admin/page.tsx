import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Package, Activity, BarChart3 } from "lucide-react";
import { format, subDays } from "date-fns";
import RevenueChart from "@/components/admin/RevenueChart"; 

// Forzamos que esta página siempre busque datos frescos (no caché estático)
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  
  // 1. CONFIGURACIÓN DE FECHAS
  const sevenDaysAgo = subDays(new Date(), 7);

  // 2. OBTENCIÓN DE DATOS PARALELA
  const [revenueData, activeOrdersCount, researchersCount, recentOrders] = await Promise.all([
    
    // A. Total Revenue Historico
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'CANCELLED' } }
    }),

    // B. Active Orders
    prisma.order.count({
      where: { status: { in: ['PENDING', 'PAID', 'SHIPPED'] } }
    }),

    // C. Researchers
    prisma.user.count(),

    // D. DATOS PARA LA GRÁFICA (Últimos 7 días)
    prisma.order.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        status: { not: 'CANCELLED' }
      },
      select: {
        createdAt: true,
        total: true
      },
      orderBy: { createdAt: 'asc' }
    })
  ]);

  // 3. PROCESAMIENTO DE DATOS PARA LA GRÁFICA
  // Inicializamos los últimos 7 días en 0 para que la gráfica no se rompa si no hay ventas un día
  const chartDataMap = new Map<string, number>();
  
  for (let i = 6; i >= 0; i--) {
    const dateStr = format(subDays(new Date(), i), 'MMM dd'); // Ej: "Feb 10"
    chartDataMap.set(dateStr, 0);
  }

  // Llenamos con datos reales
  recentOrders.forEach(order => {
    const dateStr = format(order.createdAt, 'MMM dd');
    if (chartDataMap.has(dateStr)) {
      chartDataMap.set(dateStr, (chartDataMap.get(dateStr) || 0) + Number(order.total));
    }
  });

  // Convertimos a array para Recharts
  const chartData = Array.from(chartDataMap, ([date, revenue]) => ({ date, revenue }));

  // Formateadores
  const totalRevenue = Number(revenueData._sum.total || 0);
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-display font-bold text-[var(--text-main)]">Dashboard</h1>
            <p className="text-[var(--text-muted)] text-sm">Laboratory activity overview.</p>
        </div>
        <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--glass-bg)] px-3 py-1 rounded-full border border-[var(--glass-border)]">
            v1.0.0 Stable
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Revenue */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Revenue</h3>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
             </div>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">
                {formatCurrency(totalRevenue)}
             </p>
             <div className="mt-4 text-[10px] text-emerald-400 flex items-center gap-1">
                <span>All time</span> <span className="text-[var(--text-muted)]">gross volume</span>
             </div>
        </div>

        {/* Card 2: Orders */}
        <Link href="/admin/orders" className="block">
            <div className="h-full p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-[var(--color-brand-primary)]/30 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Active Orders</h3>
                    <Package className="w-4 h-4 text-[var(--color-brand-primary)]" />
                </div>
                <p className="text-3xl font-mono font-medium text-[var(--text-main)]">
                    {activeOrdersCount}
                </p>
                <div className="mt-4 text-[10px] text-[var(--text-muted)] flex items-center gap-1 group-hover:text-[var(--color-brand-primary)] transition-colors">
                    <span>Manage orders</span> <ArrowRight className="w-3 h-3" />
                </div>
            </div>
        </Link>

        {/* Card 3: Researchers */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Researchers</h3>
                <Users className="w-4 h-4 text-blue-500" />
             </div>
             <p className="text-3xl font-mono font-medium text-[var(--text-main)]">
                {researchersCount}
             </p>
        </div>

        {/* Card 4: System Status */}
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-page)]/40 backdrop-blur-sm relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">System Status</h3>
                 <Activity className="w-4 h-4 text-emerald-500" />
             </div>
             <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse relative">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                </span>
                <span className="text-sm font-medium text-emerald-400">Operational</span>
             </div>
             <p className="mt-2 text-[10px] text-[var(--text-muted)]">Database connected</p>
        </div>

      </div>

      {/* Main Content Area (Chart + Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* GRÁFICA DE REVENUE (Columna Ancha) */}
        <div className="lg:col-span-2 border border-[var(--glass-border)] rounded-2xl p-6 bg-[var(--bg-page)]/20 relative overflow-hidden flex flex-col">
           
           {/* Chart Header */}
           <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[var(--color-brand-primary)]" />
                  Revenue Analytics
                </h3>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">Last 7 Days Performance</p>
              </div>
              
              {/* Live Indicator */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] animate-pulse" />
                 <span className="text-[10px] font-bold text-[var(--color-brand-primary)]">LIVE</span>
              </div>
           </div>

           {/* Componente Gráfica */}
           <div className="flex-1 w-full min-h-[300px]">
              <RevenueChart data={chartData} />
           </div>
        </div>
        
        {/* Quick Actions (Columna Estrecha) */}
        <div className="border border-[var(--glass-border)] rounded-2xl p-6 bg-[var(--bg-page)]/20">
            <h3 className="font-bold text-sm mb-4 text-[var(--text-main)]">Quick Actions</h3>
            <div className="space-y-2">
                <Link href="/admin/orders">
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-border)] transition-colors text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-between group">
                        View All Orders
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </Link>
                 <Link href="/admin/products">
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-border)] transition-colors text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-between group">
                        Manage Products
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </Link>
            </div>
        </div>
      </div>

    </div>
  );
}