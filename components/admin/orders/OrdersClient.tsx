"use client";

import { useState } from "react";
import { 
  Search, Package, Eye, Trash2, X, MapPin, Phone, Mail 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateOrderStatus, deleteOrder } from "@/app/actions/admin-orders";
import Image from "next/image";
import Swal from 'sweetalert2';

// Tipos actualizados con la nueva estructura de Guest Checkout
type OrderType = {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  // Objeto Customer consolidado
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
    product: { name: string; images: string; };
  }[];
};

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
    customClass: { popup: 'colored-toast' }
  });

  // Lógica de Filtrado actualizada para buscar por datos de customer
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
      Toast.fire({ icon: "success", title: `Order updated to ${newStatus}` });
    } else {
      Toast.fire({ icon: "error", title: "Failed to update status" });
    }
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#18181b",
      color: "#fff"
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      const deleteResult = await deleteOrder(orderId);
      setIsLoading(false);
      setSelectedOrder(null);

      if (deleteResult.ok) {
        Swal.fire({ title: "Deleted!", icon: "success", background: "#18181b", color: "#fff" });
      } else {
        Swal.fire({ title: "Error!", icon: "error", background: "#18181b", color: "#fff" });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "PAID": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "SHIPPED": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "CANCELLED": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center backdrop-blur-[1px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-brand-primary)]"></div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-xl">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Total Revenue</p>
            <p className="text-xl md:text-2xl font-mono font-bold text-[var(--text-main)] mt-1">
                ${filteredOrders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
        </div>
        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-xl">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Orders</p>
            <p className="text-xl md:text-2xl font-mono font-bold text-[var(--text-main)] mt-1">
                {filteredOrders.length}
            </p>
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--bg-page)]/50 p-1 sticky top-0 z-10 backdrop-blur-md">
        <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-[var(--text-muted)]" />
            <input 
                type="text" 
                placeholder="Search by email, name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-sm outline-none focus:border-[var(--color-brand-primary)]"
            />
        </div>
        <div className="flex gap-1 overflow-x-auto max-w-full no-scrollbar pb-2 md:pb-0">
            {["ALL", "PENDING", "PAID", "SHIPPED", "CANCELLED"].map((status) => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                        filter === status 
                        ? "bg-[var(--text-main)] text-[var(--bg-page)] border-transparent" 
                        : "border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--text-main)]"
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
      </div>

      {/* LISTA */}
      <div className="space-y-3">
        <AnimatePresence>
            {filteredOrders.map((order) => (
                <motion.div 
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 md:p-6 hover:border-[var(--color-brand-primary)]/30 transition-all group"
                >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs text-[var(--text-muted)]">#{order.id.slice(0, 8)}</span>
                                <span className="text-[var(--text-muted)]">•</span>
                                <span className="text-xs text-[var(--text-muted)]">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            {/* Mostramos los datos del GUEST customer */}
                            <h4 className="font-bold text-[var(--text-main)] truncate">{order.customer.email}</h4>
                            <p className="text-xs text-[var(--text-muted)] truncate">{order.customer.name}</p>
                        </div>

                        <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-end">
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                {order.status}
                            </div>
                            <div className="text-right">
                                <p className="font-mono font-bold text-[var(--text-main)]">${order.total.toFixed(2)}</p>
                                <p className="text-[10px] text-[var(--text-muted)]">{order.itemsCount} items</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--glass-border)]">
                            <button 
                                onClick={() => setSelectedOrder(order)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg text-xs font-bold hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors"
                            >
                                <Eye className="w-3 h-3" /> Details
                            </button>
                            
                            <select 
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className="bg-[var(--bg-page)] border border-[var(--glass-border)] text-xs rounded-lg px-2 py-2 outline-none focus:border-[var(--color-brand-primary)] cursor-pointer"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="PAID">Paid</option>
                                <option value="SHIPPED">Shipped</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>

                            <button 
                                onClick={() => handleDelete(order.id)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete Order"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* MODAL DE DETALLES MEJORADO */}
      <AnimatePresence>
        {selectedOrder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setSelectedOrder(null)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-[var(--bg-page)] border border-[var(--glass-border)] w-full max-w-lg max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                >
                    <div className="p-4 border-b border-[var(--glass-border)] flex justify-between items-center bg-[var(--glass-bg)]">
                        <div>
                            <h3 className="font-bold text-lg">Order Details</h3>
                            <p className="font-mono text-xs text-[var(--text-muted)]">#{selectedOrder.id}</p>
                        </div>
                        <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-[var(--glass-border)] rounded-full">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-4 overflow-y-auto flex-1 space-y-4">
                        
                        {/* 1. SECCIÓN DE ENVÍO (NUEVO) */}
                        <div className="bg-[var(--glass-border)]/20 p-4 rounded-xl border border-[var(--glass-border)] space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                                <MapPin className="w-3 h-3" /> Shipping Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs">Customer</p>
                                    <p className="font-bold">{selectedOrder.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs">Phone</p>
                                    <p className="font-mono flex items-center gap-1">
                                        <Phone className="w-3 h-3 opacity-50" /> 
                                        {selectedOrder.customer.phone}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-[var(--text-muted)] text-xs">Address</p>
                                    <p>{selectedOrder.customer.address}</p>
                                    <p>{selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.postalCode}</p>
                                    <p className="text-[var(--text-muted)] text-xs mt-1">{selectedOrder.customer.country}</p>
                                </div>
                                <div className="col-span-2 pt-2 border-t border-[var(--glass-border)]">
                                     <p className="text-[var(--text-muted)] text-xs">Email</p>
                                     <p className="flex items-center gap-2 text-blue-400">
                                        <Mail className="w-3 h-3" /> {selectedOrder.customer.email}
                                     </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. PRODUCTOS */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                                <Package className="w-3 h-3" /> Products
                            </h4>
                            {selectedOrder.items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-3 bg-[var(--glass-bg)]/30 rounded-xl border border-[var(--glass-border)]">
                                    <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0">
                                        {item.product.images ? (
                                            <Image src={item.product.images} alt={item.product.name} fill className="object-contain" />
                                        ) : ( <div className="w-full h-full bg-gray-200" /> )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold leading-tight">{item.product.name}</h4>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-xs text-[var(--text-muted)]">Qty: <b className="text-[var(--text-main)]">{item.quantity}</b></span>
                                            <span className="font-mono text-sm font-bold">${item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 3. TOTAL */}
                        <div className="pt-4 border-t border-[var(--glass-border)] flex justify-between text-lg font-bold text-[var(--color-brand-primary)]">
                            <span>Total Amount</span>
                            <span>${selectedOrder.total.toLocaleString()}</span>
                        </div>

                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}