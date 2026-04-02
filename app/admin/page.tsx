import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, ShoppingBag, Star, BarChart3, Heart } from "lucide-react";
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

    // C. Researchers (Clientes)
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
            <h1 className="text-3xl font-display font-bold text-[#33182B]">Panel de Control</h1>
            <p className="text-[#7B5C73] text-sm mt-1">Resumen mágico de actividad de la boutique.</p>
        </div>
        <div className="text-xs font-bold text-[#E85D9E] bg-[#FAD1E6]/30 px-4 py-1.5 rounded-full border border-[#FAD1E6]/50 shadow-sm">
            v1.0.0 Boutique
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Revenue (Ingresos) */}
        <div className="p-6 rounded-3xl border border-[#FAD1E6]/60 bg-[#FFFDFE]/80 backdrop-blur-md relative group overflow-hidden shadow-[0_4px_20px_rgba(250,209,230,0.15)] hover:shadow-[0_8px_24px_rgba(232,93,158,0.25)] hover:-translate-y-1 transition-all duration-500">
             <div className="absolute inset-0 bg-gradient-to-br from-[#FAD1E6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="flex justify-between items-start mb-2 relative z-10">
                <h3 className="text-xs font-bold text-[#7B5C73] uppercase tracking-widest">Ingresos Totales</h3>
                <div className="p-2 bg-[#E85D9E]/10 rounded-full">
                  <Sparkles className="w-4 h-4 text-[#E85D9E]" />
                </div>
             </div>
             <p className="text-3xl font-display font-bold text-[#33182B] relative z-10">
                {formatCurrency(totalRevenue)}
             </p>
             <div className="mt-4 text-[10px] text-[#E85D9E] flex items-center gap-1 font-medium relative z-10">
                <span>Histórico</span> <span className="text-[#7B5C73]">volumen bruto</span>
             </div>
        </div>

        {/* Card 2: Orders (Pedidos) */}
        <Link href="/admin/orders" className="block">
            <div className="h-full p-6 rounded-3xl border border-[#FAD1E6]/60 bg-[#FFFDFE]/80 backdrop-blur-md relative group overflow-hidden shadow-[0_4px_20px_rgba(250,209,230,0.15)] hover:shadow-[0_8px_24px_rgba(232,93,158,0.25)] hover:-translate-y-1 hover:border-[#E85D9E]/40 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FAD1E6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-between items-start mb-2 relative z-10">
                    <h3 className="text-xs font-bold text-[#7B5C73] uppercase tracking-widest">Pedidos Activos</h3>
                    <div className="p-2 bg-[#FFA8C5]/20 rounded-full group-hover:bg-[#FFA8C5]/40 transition-colors">
                      <ShoppingBag className="w-4 h-4 text-[#E85D9E]" />
                    </div>
                </div>
                <p className="text-3xl font-display font-bold text-[#33182B] relative z-10">
                    {activeOrdersCount}
                </p>
                <div className="mt-4 text-[10px] font-medium text-[#7B5C73] flex items-center gap-1 group-hover:text-[#E85D9E] transition-colors relative z-10">
                    <span>Gestionar pedidos</span> <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>

        {/* Card 3: Researchers (Clientes) */}
        <div className="p-6 rounded-3xl border border-[#FAD1E6]/60 bg-[#FFFDFE]/80 backdrop-blur-md relative group overflow-hidden shadow-[0_4px_20px_rgba(250,209,230,0.15)] hover:shadow-[0_8px_24px_rgba(232,93,158,0.25)] hover:-translate-y-1 transition-all duration-500">
             <div className="absolute inset-0 bg-gradient-to-br from-[#FAD1E6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="flex justify-between items-start mb-2 relative z-10">
                <h3 className="text-xs font-bold text-[#7B5C73] uppercase tracking-widest">Clientes</h3>
                <div className="p-2 bg-[#FAD1E6]/40 rounded-full">
                  <Users className="w-4 h-4 text-[#E85D9E]" />
                </div>
             </div>
             <p className="text-3xl font-display font-bold text-[#33182B] relative z-10">
                {researchersCount}
             </p>
        </div>

        {/* Card 4: System Status (Estado) */}
        <div className="p-6 rounded-3xl border border-[#FAD1E6]/60 bg-[#FFFDFE]/80 backdrop-blur-md relative group overflow-hidden shadow-[0_4px_20px_rgba(250,209,230,0.15)] hover:shadow-[0_8px_24px_rgba(232,93,158,0.25)] hover:-translate-y-1 transition-all duration-500">
             <div className="absolute inset-0 bg-gradient-to-br from-[#FAD1E6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="flex justify-between items-start mb-2 relative z-10">
                 <h3 className="text-xs font-bold text-[#7B5C73] uppercase tracking-widest">Estado del Sistema</h3>
                 <div className="p-2 bg-[#E85D9E]/10 rounded-full">
                   <Star className="w-4 h-4 text-[#E85D9E]" />
                 </div>
             </div>
             <div className="flex items-center gap-2 mt-2 relative z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E85D9E] animate-pulse relative shadow-[0_0_8px_rgba(232,93,158,0.8)]">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFA8C5] opacity-75 animate-ping"></span>
                </span>
                <span className="text-sm font-bold text-[#E85D9E]">Mágico y Operativo</span>
             </div>
             <p className="mt-2 text-[10px] font-medium text-[#7B5C73] relative z-10">Base de datos conectada</p>
        </div>

      </div>

      {/* Main Content Area (Chart + Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* GRÁFICA DE REVENUE (Columna Ancha) */}
        <div className="lg:col-span-2 border border-[#FAD1E6]/60 rounded-3xl p-6 bg-[#FFFDFE]/80 backdrop-blur-xl relative overflow-hidden flex flex-col shadow-[0_4px_24px_rgba(250,209,230,0.15)]">
           
           {/* Chart Header */}
           <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-sm text-[#33182B] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#E85D9E]" />
                  Análisis de Ingresos
                </h3>
                <p className="text-[10px] font-bold text-[#7B5C73] uppercase tracking-widest mt-1">Rendimiento - Últimos 7 Días</p>
              </div>
              
              {/* Live Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAD1E6]/40 border border-[#FAD1E6]">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#E85D9E] animate-pulse shadow-[0_0_6px_rgba(232,93,158,0.8)]" />
                 <span className="text-[10px] font-bold text-[#E85D9E] tracking-widest">EN VIVO</span>
              </div>
           </div>

           {/* Componente Gráfica (Se mantiene intacto) */}
           <div className="flex-1 w-full min-h-[300px]">
              <RevenueChart data={chartData} />
           </div>
        </div>
        
        {/* Quick Actions (Columna Estrecha) */}
        <div className="border border-[#FAD1E6]/60 rounded-3xl p-6 bg-[#FFFDFE]/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(250,209,230,0.15)]">
            <h3 className="font-bold text-sm mb-5 text-[#33182B] flex items-center gap-2">
               <Heart className="w-4 h-4 text-[#E85D9E]" />
               Acciones Rápidas
            </h3>
            <div className="space-y-3">
                <Link href="/admin/orders">
                    <button className="w-full text-left px-5 py-4 rounded-2xl bg-[#FAD1E6]/20 border border-[#FAD1E6]/50 hover:bg-[#FAD1E6]/40 hover:border-[#E85D9E]/30 hover:shadow-[0_4px_12px_rgba(250,209,230,0.4)] transition-all duration-300 text-xs font-bold uppercase tracking-widest text-[#7B5C73] hover:text-[#33182B] flex items-center justify-between group">
                        Ver Todos los Pedidos
                        <ArrowRight className="w-4 h-4 text-[#E85D9E] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                </Link>
                 <Link href="/admin/products">
                    <button className="w-full text-left px-5 py-4 rounded-2xl bg-[#FAD1E6]/20 border border-[#FAD1E6]/50 hover:bg-[#FAD1E6]/40 hover:border-[#E85D9E]/30 hover:shadow-[0_4px_12px_rgba(250,209,230,0.4)] transition-all duration-300 text-xs font-bold uppercase tracking-widest text-[#7B5C73] hover:text-[#33182B] flex items-center justify-between group">
                        Gestionar Productos
                        <ArrowRight className="w-4 h-4 text-[#E85D9E] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                </Link>
            </div>
        </div>
      </div>

    </div>
  );
}