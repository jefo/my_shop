exports.shorthands = undefined;

const commonFields = pgm => ({
  createdAt: {
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp'),
  },
});

exports.up = pgm => {
  pgm.createTable('products', {
    id: 'id',
    title: { type: 'varchar(1000)', notNull: true },
    price: { type: 'money' },
    description: { type: 'text' },
    ...commonFields(pgm),
  });
  pgm.createTable('bills', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    street_address: { type: 'varchar(1000)', notNull: true },
    street_address2: { type: 'varchar(1000)' },
    city: { type: 'varchar(100)' },
    country: { type: 'varchar(100)' },
    state: { type: 'varchar(100)' },
    zip_code: { type: 'varchar(10)' },
    phone: { type: 'varchar(20)' },
    email: { type: 'varchar(100)', notNull: true },
    ...commonFields,
  });
  pgm.createTable(
    'products_bills',
    {
      bill_id: {
        type: 'int',
        references: 'bills',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE ',
      },
      product_id: {
        type: 'int',
        references: 'products',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE ',
      },
    },
    {
      constraints: {
        bill_product_pkey: { primaryKey: ['bill_id, product_id'] },
      },
    },
  );
  pgm.createTable('shipping', {
    id: 'id',
    title: { type: 'varchar(100)', notNull: true },
    description: { type: 'varchar(100)' },
    price: { type: 'money' },
  });
  pgm.createType('card', ['Visa', 'Mastercard', 'American Express']);
  pgm.createTable('payments', {
    id: 'id',
    card_type: { type: 'card' },
    name_of_card: { type: 'varchar(100)' },
    card_number: { type: 'varchar(19)' },
    cvs: { type: 'varchar(3)' },
    expiration_month: { type: 'varchar(50)' },
    expiration_year: { type: 'varchar(4)' },
  });
};

exports.down = pgm => {};
