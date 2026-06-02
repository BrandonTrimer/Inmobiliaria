// Base de datos de propiedades de la inmobiliaria Danny Moya
const propiedades = [
  {
    id: 1,
    tipo: "Casa",
    titulo: "Villa Minimalista de Lujo",
    descripcion: "Espectacular residencia minimalista en el corazón residencial de Tiquipaya. Esta magnífica propiedad destaca por sus líneas arquitectónicas limpias, amplios ventanales de piso a techo que inundan la casa de luz natural, y un diseño fluido de concepto abierto. Cuenta con acabados de primera calidad, pisos de porcelanato importado, grifería italiana y una cocina equipada de ensueño con mesones de cuarzo. El jardín posterior ofrece una piscina climatizada con borde infinito, ideal para disfrutar del clima templado de la zona. Se encuentra en una urbanización cerrada de alta seguridad con áreas comunes exclusivas.",
    zona: "Tiquipaya",
    direccion: "Av. Ecológica Km 4.5, Urbanización El Bosque",
    tamano: 450,
    dormitorios: 4,
    banos: 5,
    estado: "disponible",
    imagenes: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15243.832968393524!2d-66.21626084999999!3d-17.34159515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3776d655f0535%3A0xe5a3c0540d99fae5!2sTiquipaya!5e0!3m2!1ses!2sbo!4v1716768000000!5m2!1ses!2sbo"
  },
  {
    id: 2,
    tipo: "Casa",
    titulo: "Loft Urbano Vanguardista",
    descripcion: "Exclusivo loft minimalista de diseño industrial ubicado en una de las zonas más cotizadas y dinámicas de Cercado, Cochabamba. La propiedad ofrece una experiencia habitacional única con techos de doble altura, estructura metálica vista y paredes de hormigón pulido que aportan un carácter contemporáneo inigualable. Incluye una terraza privada equipada con churrasquera premium y espectaculares vistas panorámicas de la ciudad. Equipado con domótica inteligente para el control de iluminación, seguridad y sonido ambiente en toda la residencia.",
    zona: "Cercado",
    direccion: "Calle Antezana esq. Av. América, Zona Norte",
    tamano: 220,
    dormitorios: 2,
    banos: 3,
    estado: "disponible",
    imagenes: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.697479707297!2d-66.15781362489814!3d-17.378333383748286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373f78997a3cf%3A0x600109436329c0f!2sCochabamba!5e0!3m2!1ses!2sbo!4v1716768100000!5m2!1ses!2sbo"
  },
  {
    id: 3,
    tipo: "Terreno",
    titulo: "Terreno Residencial en Colinas",
    descripcion: "Espectacular terreno residencial ubicado en la exclusiva zona de colinas de Sacaba, ofreciendo una vista panorámica sin igual del valle. Cuenta con topografía regular, ideal para el desarrollo de una mansión minimalista o un complejo familiar de lujo. El área destaca por su pureza del aire, tranquilidad absoluta y seguridad, a solo 15 minutos del centro de la ciudad de Cochabamba. Todos los servicios básicos instalados a pie de lote (agua de cooperativa, alcantarillado, electricidad y fibra óptica). Documentación totalmente al día lista para transferencia inmediata.",
    zona: "Sacaba",
    direccion: "Zona Quintanilla Alta, Colinas de Sacaba",
    tamano: 1200,
    dormitorios: 0,
    banos: 0,
    estado: "disponible",
    imagenes: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.8282367123985!2d-66.04258812489827!3d-17.372066583753733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e36e47614d3b87%3A0xc00f09230dc372f8!2sSacaba!5e0!3m2!1ses!2sbo!4v1716768200000!5m2!1ses!2sbo"
  },
  {
    id: 4,
    tipo: "Casa",
    titulo: "Eco-Residencia Quillacollo",
    descripcion: "Preciosa casa de campo con diseño ecológico minimalista en venta en Quillacollo. Construida con una perfecta integración de materiales nobles locales, madera tratada y amplias superficies acristaladas. Rodeada de huertos frutales y una atmósfera campestre inigualable que invita al descanso. Cuenta con sistemas eficientes de energía solar y recolección de aguas pluviales para el riego del paisajismo. Espacios amplios que fusionan el exterior con el interior, incluyendo una sala con chimenea a leña y cocina abierta rústico-minimalista. Una verdadera joya autosustentable.",
    zona: "Quillacollo",
    direccion: "Av. Blanco Galindo Km 11, Entrada a Cotapachi",
    tamano: 310,
    dormitorios: 3,
    banos: 3,
    estado: "vendido",
    imagenes: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15243.32986422709!2d-66.29177249999999!3d-17.39589315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e30bc0642fa605%3A0xc00f09230dc372f9!2sQuillacollo!5e0!3m2!1ses!2sbo!4v1716768300000!5m2!1ses!2sbo"
  },
  {
    id: 5,
    tipo: "Casa",
    titulo: "Casa de Campo Moderna en Tiquipaya",
    descripcion: "Estupenda residencia familiar de corte moderno situada en una de las zonas más tranquilas de Tiquipaya. Esta casa combina magistralmente la comodidad contemporánea con la calidez del entorno natural. Ofrece 3 amplias habitaciones en suite, una sala de estar familiar acogedora, un estudio privado y una espectacular galería techada que conecta directamente con un gran jardín con árboles frutales y espacio de juegos para niños. Ideal para quienes buscan un retiro de paz y armonía familiar sin alejarse de la ciudad.",
    zona: "Tiquipaya",
    direccion: "Calle Lindemann, Zona Chupapampa",
    tamano: 380,
    dormitorios: 3,
    banos: 4,
    estado: "disponible",
    imagenes: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=800",
      "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?q=80&w=800",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15243.832968393524!2d-66.21626084999999!3d-17.34159515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3776d655f0535%3A0xe5a3c0540d99fae5!2sTiquipaya!5e0!3m2!1ses!2sbo!4v1716768000000!5m2!1ses!2sbo"
  },
  {
    id: 6,
    tipo: "Terreno",
    titulo: "Lote Urbanizado en Zona Norte",
    descripcion: "Oportunidad única en Cercado, Cochabamba: exclusivo lote de terreno de 500 m² completamente urbanizado, ubicado en la cotizada Zona Norte. Cuenta con alcantarillado público, agua potable de red, acometida eléctrica trifásica y alumbrado público LED. El vecindario cuenta con modernas viviendas a su alrededor y goza de una excelente plusvalía. Cerca de colegios prestigiosos, universidades, centros comerciales y parques. Ideal para construir la casa de sus sueños de inmediato.",
    zona: "Cercado",
    direccion: "Av. Gualberto Villarroel, Barrio Muyurina",
    tamano: 500,
    dormitorios: 0,
    banos: 0,
    estado: "disponible",
    imagenes: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.697479707297!2d-66.15781362489814!3d-17.378333383748286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373f78997a3cf%3A0x600109436329c0f!2sCochabamba!5e0!3m2!1ses!2sbo!4v1716768100000!5m2!1ses!2sbo"
  },
  {
    id: 7,
    tipo: "Casa",
    titulo: "Chalet Minimalista Sacaba",
    descripcion: "Hermoso chalet minimalista en venta en una tranquila y apacible urbanización residencial en Sacaba. La casa está diseñada con un enfoque contemporáneo, combinando un gran uso del cristal, acero y hormigón. Cuenta con una gran cocina de concepto abierto conectada con la sala comedor, un patio privado con deck de madera ideal para reuniones sociales y habitaciones amplias con vestidores a medida. La propiedad destaca por su seguridad, accesibilidad y excelente estado de conservación.",
    zona: "Sacaba",
    direccion: "Urbanización Juan XXIII, Km 3.5 Camino a Sacaba",
    tamano: 280,
    dormitorios: 3,
    banos: 3.5,
    estado: "vendido",
    imagenes: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=800",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=800",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.8282367123985!2d-66.04258812489827!3d-17.372066583753733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e36e47614d3b87%3A0xc00f09230dc372f8!2sSacaba!5e0!3m2!1ses!2sbo!4v1716768200000!5m2!1ses!2sbo"
  },
  {
    id: 8,
    tipo: "Casa",
    titulo: "Estilo Flat Campestre Quillacollo",
    descripcion: "Fabulosa residencia moderna estilo flat, emplazada en un amplio terreno rodeado de vegetación nativa en Quillacollo. La propiedad cuenta con techos inclinados de teja moderna, una gran terraza semi-cubierta y barbacoa exterior premium. Sus interiores luminosos integran materiales cálidos en tonos beige y madera natural, con una hermosa sala equipada con luminarias LED empotradas. Es perfecta para quienes anhelan disfrutar de un clima inmejorable, jardines privados extensos y la más absoluta privacidad.",
    zona: "Quillacollo",
    direccion: "Zona El Paso, Calle Abaroa",
    tamano: 340,
    dormitorios: 3,
    banos: 3,
    estado: "disponible",
    imagenes: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15243.32986422709!2d-66.29177249999999!3d-17.39589315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e30bc0642fa605%3A0xc00f09230dc372f9!2sQuillacollo!5e0!3m2!1ses!2sbo!4v1716768300000!5m2!1ses!2sbo"
  }
];
