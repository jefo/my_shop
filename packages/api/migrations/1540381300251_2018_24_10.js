exports.shorthands = undefined;

const commonFields = pgm => ({
  created_at: {
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp'),
  },
  updated_at: {
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp'),
  },
});

exports.up = pgm => {
  pgm.createTable('my_products', {
    id: 'id',
    title: { type: 'varchar(1000)', notNull: true },
    price: { type: 'money' },
    description: { type: 'text' },
    ...commonFields(pgm),
  });
  pgm.createTable('my_bills', {
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
    ...commonFields(pgm),
  });
  pgm.createTable(
    'my_rel_products_bills',
    {
      bill_id: {
        type: 'int',
        references: 'my_bills',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE ',
      },
      product_id: {
        type: 'int',
        references: 'my_products',
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
  pgm.createTable('my_shipping', {
    id: 'id',
    title: { type: 'varchar(100)', notNull: true },
    description: { type: 'varchar(100)' },
    price: { type: 'money' },
    ...commonFields(pgm),
  });
  pgm.createType('my_card', ['Visa', 'Mastercard', 'American Express']);
  pgm.createTable('my_payments', {
    id: 'id',
    card_type: { type: 'my_card' },
    name_of_card: { type: 'varchar(100)' },
    card_number: { type: 'varchar(19)' },
    cvs: { type: 'varchar(3)' },
    expiration_month: { type: 'varchar(50)' },
    expiration_year: { type: 'varchar(4)' },
    ...commonFields(pgm),
  });
};

exports.down = pgm => {
  pgm.dropTable('my_products', { cascade: true });
  pgm.dropTable('my_bills', { cascade: true });
  pgm.dropTable('my_products_bills', { cascade: true });
  pgm.dropTable('my_shipping', { cascade: true });
  pgm.dropTable('my_payments', { cascade: true });
  pgm.dropType('my_card');
};
