"use client";

import { useState } from "react";
import { 
  Search, Package, Eye, Trash2, X, MapPin, Phone, Mail, Scissors, Palette, Ruler 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateOrderStatus, deleteOrder } from "@/app/actions/admin-orders";
import Image from "next/image";
import Swal from 'sweetalert2';

// Tipos actualizados con la nueva estructura y los nuevos campos del Product
type OrderType = {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  customer: { 
      name: string; 
      email: string; 
      phone: string;
      address: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
  };
  itemsCount: number;
  items: { 
    id: string;
    quantity: number;
    price: number;
    product: { 
        name: string; 
        images: string;
        size?: string | null;
        color?: string | null;
        material?: string | null;
    };
  }[];
};

const STATUS_FILTERS = [
  { value: "ALL", label: "TODOS" },
  { value: "PENDING", label: "PENDIENTES" },
  { value: "PAID", label: "PAGADOS" },
  { value: "SHIPPED", label: "ENVIADOS" },
  { value: "CANCELLED", label: "CANCELADOS" }
];

export default function OrdersClient({ initialOrders }: { initialOrders: OrderType[] }) {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: { popup: 'rounded-2xl border border-[#FAD1E6] shadow-lg bg-white text-[#33182B] font-sans' }
  });

  const filteredOrders = initialOrders.filter((order) => {
    const matchesStatus = filter === "ALL" || order.status === filter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setIsLoading(true);
    const result = await updateOrderStatus(orderId, newStatus as any);
    setIsLoading(false);

    if (result.ok) {
      Toast.fire({ icon: "success", title: `Estado actualizado con éxito` });
    } else {
      Toast.fire({ icon: "error", title: "Error al actualizar el estado" });
    }
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E85D9E",
      cancelButtonColor: "#7B5C73",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#FFFDFE",
      color: "#33182B",
      customClass: {
          popup: "rounded-[2rem] border border-[#FAD1E6]/50 shadow-2xl font-sans"
      }
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      const deleteResult = await deleteOrder(orderId);
      setIsLoading(false);
      setSelectedOrder(null);

      if (deleteResult.ok) {
        Swal.fire({ title: "Eliminado", text: "El pedido ha sido borrado.", icon: "success", background: "#FFFDFE", color: "#33182B" });
      } else {
        Swal.fire({ title: "Error", text: "Hubo un problema al eliminar.", icon: "error", background: "#FFFDFE", color: "#33182B" });
      }
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING": return { label: "PENDIENTE", styles: "text-amber-600 bg-amber-50 border-amber-200" };
      case "PAID": return { label: "PAGADO", styles: "text-emerald-600 bg-emerald-50 border-emerald-200" };
      case "SHIPPED": return { label: "ENVIADO", styles: "text-blue-600 bg-blue-50 border-blue-200" };
      case "CANCELLED": return { label: "CANCELADO", styles: "text-red-600 bg-red-50 border-red-200" };
      default: return { label: status, styles: "text-gray-600 bg-gray-50 border-gray-200" };
    }
  };

  return (
    <div className="space-y-6 relative font-sans">
      
      {isLoading && (
        <div className="fixed inset-0 bg-[#33182B]/20 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E85D9E]"></div>
        </div>
      )}

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#FAD1E6]/60 p-5 rounded-[24px] shadow-[0_4px_20px_-10px_rgba(232,93,158,0.15)]">
            <p className="text-xs text-[#7B5C73] uppercase tracking-widest font-bold">Ingresos Totales</p>
            <p className="text-2xl md:text-3xl font-display font-bold text-[#33182B] mt-2">
                ${filteredOrders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('es-CO')}
            </p>
        </div>
        <div className="bg-white border border-[#FAD1E6]/60 p-5 rounded-[24px] shadow-[0_4px_20px_-10px_rgba(232,93,158,0.15)]">
            <p className="text-xs text-[#7B5C73] uppercase tracking-widest font-bold">Total Pedidos</p>
            <p className="text-2xl md:text-3xl font-display font-bold text-[#33182B] mt-2">
                {filteredOrders.length}
            </p>
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#FFFDFE]/80 p-2 rounded-2xl sticky top-0 z-10 backdrop-blur-md border border-[#FAD1E6]/30">
        <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#7B5C73]/60 group-focus-within:text-[#E85D9E] transition-colors" />
            <input 
                type="text" 
                placeholder="Buscar por email, nombre o ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#FAD1E6]/60 rounded-xl text-sm outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all text-[#33182B] placeholder:text-[#7B5C73]/50"
            />
        </div>
        <div className="flex gap-2 overflow-x-auto max-w-full no-scrollbar pb-2 md:pb-0">
            {STATUS_FILTERS.map((s) => (
                <button
                    key={s.value}
                    onClick={() => setFilter(s.value)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-bold border transition-all uppercase tracking-wide shrink-0 ${
                        filter === s.value 
                        ? "bg-[#E85D9E] text-white border-transparent shadow-[0_4px_15px_-3px_rgba(232,93,158,0.4)]" 
                        : "bg-white border-[#FAD1E6]/60 text-[#7B5C73] hover:border-[#E85D9E]/50 hover:text-[#E85D9E]"
                    }`}
                >
                    {s.label}
                </button>
            ))}
        </div>
      </div>

      {/* LISTA DE PEDIDOS */}
      <div className="space-y-4">
        <AnimatePresence>
            {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                
                return (
                <motion.div 
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-[#FAD1E6]/50 rounded-[24px] p-5 md:p-6 hover:shadow-[0_10px_30px_-10px_rgba(232,93,158,0.15)] hover:border-[#E85D9E]/40 transition-all group"
                >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-mono text-xs font-medium text-[#7B5C73] bg-[#FAD1E6]/20 px-2 py-0.5 rounded-md border border-[#FAD1E6]/30">
                                    #{order.id.slice(0, 8)}
                                </span>
                                <span className="text-[#7B5C73]/40">•</span>
                                <span className="text-xs text-[#7B5C73] font-medium">
                                    {new Date(order.createdAt).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                            <h4 className="font-bold text-[#33182B] text-base truncate">{order.customer.email}</h4>
                            <p className="text-sm text-[#7B5C73] truncate capitalize mt-0.5">{order.customer.name}</p>
                        </div>

                        <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-end">
                            <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold border flex items-center gap-2 tracking-wide ${statusInfo.styles}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                {statusInfo.label}
                            </div>
                            <div className="text-right">
                                <p className="font-display font-bold text-lg text-[#33182B]">${order.total.toLocaleString('es-CO')}</p>
                                <p className="text-xs text-[#7B5C73] font-medium">{order.itemsCount} {order.itemsCount === 1 ? 'prenda' : 'prendas'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-[#FAD1E6]/30">
                            <button 
                                onClick={() => setSelectedOrder(order)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#FAD1E6] rounded-xl text-xs font-bold text-[#E85D9E] hover:bg-[#FFF6F9] transition-colors shadow-sm"
                            >
                                <Eye className="w-4 h-4" /> Ver Detalles
                            </button>
                            
                            <div className="relative">
                                <select 
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className="appearance-none bg-white border border-[#FAD1E6] text-xs text-[#7B5C73] font-bold rounded-xl px-3 py-2.5 pr-8 outline-none focus:border-[#E85D9E] cursor-pointer shadow-sm"
                                >
                                    <option value="PENDING">Pendiente</option>
                                    <option value="PAID">Pagado</option>
                                    <option value="SHIPPED">Enviado</option>
                                    <option value="CANCELLED">Cancelado</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l border-b border-[#7B5C73] w-2 h-2 -rotate-45" />
                            </div>

                            <button 
                                onClick={() => handleDelete(order.id)}
                                className="p-2.5 text-red-400 border border-transparent hover:border-red-100 hover:bg-red-50 rounded-xl transition-colors"
                                title="Eliminar Pedido"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
                );
            })}
        </AnimatePresence>
      </div>

      {/* MODAL DE DETALLES */}
      <AnimatePresence>
        {selectedOrder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setSelectedOrder(null)}
                    className="absolute inset-0 bg-[#33182B]/40 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                    animate={{ scale: 1, opacity: 1, y: 0 }} 
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative bg-white border border-[#FAD1E6]/80 w-full max-w-xl max-h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col font-sans"
                >
                    {/* Header Modal */}
                    <div className="p-5 md:p-6 border-b border-[#FAD1E6]/50 flex justify-between items-center bg-[#FFF6F9]">
                        <div>
                            <h3 className="font-display font-bold text-xl text-[#33182B]">Detalles del Pedido</h3>
                            <p className="font-mono text-xs text-[#7B5C73] mt-1">ID: #{selectedOrder.id}</p>
                        </div>
                        <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white border border-[#FAD1E6] text-[#7B5C73] hover:text-[#E85D9E] hover:border-[#E85D9E] rounded-full transition-colors shadow-sm">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-5 md:p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
                        
                        {/* 1. SECCIÓN DE ENVÍO */}
                        <div className="bg-white border border-[#FAD1E6] p-5 rounded-[20px] shadow-sm space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E85D9E] flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Información de Envío
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm text-[#33182B]">
                                <div>
                                    <p className="text-[#7B5C73] text-[10px] uppercase tracking-wide font-bold mb-1">Cliente</p>
                                    <p className="font-bold capitalize">{selectedOrder.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-[#7B5C73] text-[10px] uppercase tracking-wide font-bold mb-1">Teléfono</p>
                                    <p className="font-mono flex items-center gap-1.5 font-medium">
                                        <Phone className="w-3.5 h-3.5 text-[#7B5C73]" /> 
                                        {selectedOrder.customer.phone}
                                    </p>
                                </div>
                                <div className="col-span-2 bg-[#FFF6F9] p-3 rounded-xl border border-[#FAD1E6]/50">
                                    <p className="text-[#7B5C73] text-[10px] uppercase tracking-wide font-bold mb-1">Dirección</p>
                                    <p className="font-medium">{selectedOrder.customer.address}</p>
                                    <p className="font-medium">{selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.postalCode}</p>
                                    <p className="text-[#7B5C73] text-xs mt-1 font-medium">{selectedOrder.customer.country}</p>
                                </div>
                                <div className="col-span-2 pt-3 border-t border-[#FAD1E6]/50">
                                     <p className="text-[#7B5C73] text-[10px] uppercase tracking-wide font-bold mb-1">Correo Electrónico</p>
                                     <p className="flex items-center gap-2 font-medium">
                                        <Mail className="w-4 h-4 text-[#E85D9E]" /> {selectedOrder.customer.email}
                                     </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. PRODUCTOS */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E85D9E] flex items-center gap-2">
                                <Package className="w-4 h-4" /> Prendas Solicitadas
                            </h4>
                            <div className="space-y-3">
                                {selectedOrder.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-white border border-[#FAD1E6] rounded-[20px] shadow-sm">
                                        <div className="relative w-20 h-20 bg-[#FFF6F9] rounded-2xl overflow-hidden shrink-0 border border-[#FAD1E6]/50">
                                            {item.product.images ? (
                                                <Image src={item.product.images.split(',')[0]} alt={item.product.name} fill className="object-cover" />
                                            ) : ( <div className="w-full h-full flex items-center justify-center"><Package className="w-6 h-6 text-[#FAD1E6]" /></div> )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-base font-bold text-[#33182B] leading-tight">{item.product.name}</h4>
                                                
                                                {/* Atributos del producto añadidos (Talla, Color, Material) */}
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {item.product.size && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7B5C73] bg-[#FAD1E6]/20 border border-[#FAD1E6] px-2 py-0.5 rounded-md uppercase">
                                                            <Ruler className="w-3 h-3" /> {item.product.size}
                                                        </span>
                                                    )}
                                                    {item.product.color && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7B5C73] bg-[#FAD1E6]/20 border border-[#FAD1E6] px-2 py-0.5 rounded-md uppercase">
                                                            <Palette className="w-3 h-3" /> {item.product.color}
                                                        </span>
                                                    )}
                                                    {item.product.material && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7B5C73] bg-[#FAD1E6]/20 border border-[#FAD1E6] px-2 py-0.5 rounded-md uppercase">
                                                            <Scissors className="w-3 h-3" /> {item.product.material}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-end mt-2">
                                                <span className="text-xs font-medium text-[#7B5C73]">
                                                    Cantidad: <b className="text-[#E85D9E] text-sm ml-1">{item.quantity}</b>
                                                </span>
                                                <span className="font-display text-base font-bold text-[#33182B]">${Number(item.price).toLocaleString('es-CO')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. TOTAL */}
                        <div className="mt-4 p-5 bg-[#FFF6F9] rounded-[20px] border border-[#FAD1E6] flex justify-between items-center text-[#33182B]">
                            <span className="font-bold uppercase tracking-wider text-sm">Total del Pedido</span>
                            <span className="font-display text-2xl font-bold text-[#E85D9E]">${selectedOrder.total.toLocaleString('es-CO')}</span>
                        </div>

                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}