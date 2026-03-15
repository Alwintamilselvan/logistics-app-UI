export interface Delivery {
  id: string;
  customerName: string;
  address: string;
  city: string;
  zipCode: string;
  packageId: string;
  status: 'pending' | 'out-for-delivery' | 'delivered' | 'failed';
  contactNumber: string;
  notes?: string;
  deliveryDate: string;
  latitude: number;
  longitude: number;
  signature?: string;
  photo?: string;
  deliveryNotes?: string;
  deliveredAt?: string;
  assignedDriver?: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleNumber: string;
  status: 'active' | 'inactive';
  deliveriesToday: number;
  completedDeliveries: number;
}

export const mockDeliveries: Delivery[] = [
  {
    id: 'DEL001',
    customerName: 'Sarah Johnson',
    address: '123 Oak Street',
    city: 'San Francisco',
    zipCode: '94102',
    packageId: 'PKG-2024-001',
    status: 'pending',
    contactNumber: '+1 (555) 123-4567',
    deliveryDate: '2026-03-13',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 'DEL002',
    customerName: 'Michael Chen',
    address: '456 Pine Avenue',
    city: 'San Francisco',
    zipCode: '94103',
    packageId: 'PKG-2024-002',
    status: 'out-for-delivery',
    contactNumber: '+1 (555) 234-5678',
    deliveryDate: '2026-03-13',
    latitude: 37.7849,
    longitude: -122.4094,
    assignedDriver: 'John Smith',
  },
  {
    id: 'DEL003',
    customerName: 'Emily Rodriguez',
    address: '789 Maple Drive',
    city: 'San Francisco',
    zipCode: '94104',
    packageId: 'PKG-2024-003',
    status: 'delivered',
    contactNumber: '+1 (555) 345-6789',
    deliveryDate: '2026-03-13',
    latitude: 37.7949,
    longitude: -122.3994,
    deliveredAt: '2026-03-13T10:30:00',
    signature: 'data:image/png;base64,signature',
    photo: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400',
    deliveryNotes: 'Left at front door as requested',
    assignedDriver: 'John Smith',
  },
  {
    id: 'DEL004',
    customerName: 'David Kim',
    address: '321 Elm Boulevard',
    city: 'San Francisco',
    zipCode: '94105',
    packageId: 'PKG-2024-004',
    status: 'failed',
    contactNumber: '+1 (555) 456-7890',
    deliveryDate: '2026-03-12',
    latitude: 37.7649,
    longitude: -122.4294,
    deliveryNotes: 'Customer not available, will retry tomorrow',
    assignedDriver: 'John Smith',
  },
  {
    id: 'DEL005',
    customerName: 'Jessica Martinez',
    address: '654 Cedar Lane',
    city: 'San Francisco',
    zipCode: '94106',
    packageId: 'PKG-2024-005',
    status: 'pending',
    contactNumber: '+1 (555) 567-8901',
    deliveryDate: '2026-03-13',
    latitude: 37.7549,
    longitude: -122.4394,
  },
  {
    id: 'DEL006',
    customerName: 'Robert Taylor',
    address: '987 Birch Court',
    city: 'San Francisco',
    zipCode: '94107',
    packageId: 'PKG-2024-006',
    status: 'delivered',
    contactNumber: '+1 (555) 678-9012',
    deliveryDate: '2026-03-13',
    latitude: 37.7449,
    longitude: -122.4494,
    deliveredAt: '2026-03-13T09:15:00',
    signature: 'data:image/png;base64,signature',
    photo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
    deliveryNotes: 'Delivered to receptionist',
    assignedDriver: 'Maria Garcia',
  },
];

export const mockDrivers: Driver[] = [
  {
    id: 'DRV001',
    name: 'John Smith',
    email: 'john.smith@logistics.com',
    phone: '+1 (555) 111-2222',
    vehicleNumber: 'VAN-001',
    status: 'active',
    deliveriesToday: 5,
    completedDeliveries: 3,
  },
  {
    id: 'DRV002',
    name: 'Maria Garcia',
    email: 'maria.garcia@logistics.com',
    phone: '+1 (555) 222-3333',
    vehicleNumber: 'VAN-002',
    status: 'active',
    deliveriesToday: 4,
    completedDeliveries: 2,
  },
  {
    id: 'DRV003',
    name: 'James Wilson',
    email: 'james.wilson@logistics.com',
    phone: '+1 (555) 333-4444',
    vehicleNumber: 'VAN-003',
    status: 'inactive',
    deliveriesToday: 0,
    completedDeliveries: 0,
  },
];

export const getDeliveryById = (id: string): Delivery | undefined => {
  return mockDeliveries.find(d => d.id === id);
};

export const getDriverStats = (driverId: string) => {
  const driver = mockDrivers.find(d => d.id === driverId);
  if (!driver) return null;
  
  return {
    deliveriesToday: driver.deliveriesToday,
    pending: mockDeliveries.filter(d => d.status === 'pending').length,
    completed: mockDeliveries.filter(d => d.status === 'delivered' && d.assignedDriver === driver.name).length,
  };
};

export const getDashboardStats = () => {
  return {
    totalDeliveries: mockDeliveries.length,
    delivered: mockDeliveries.filter(d => d.status === 'delivered').length,
    outForDelivery: mockDeliveries.filter(d => d.status === 'out-for-delivery').length,
    pending: mockDeliveries.filter(d => d.status === 'pending').length,
    failed: mockDeliveries.filter(d => d.status === 'failed').length,
    activeDrivers: mockDrivers.filter(d => d.status === 'active').length,
  };
};
