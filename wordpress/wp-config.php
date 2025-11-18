<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'denayer2' );

/** MySQL database username */
define( 'DB_USER', 'denayer2' );

/** MySQL database password */
define( 'DB_PASSWORD', 'TdB6hRNo0D' );

/** MySQL hostname */
define( 'DB_HOST', 'denayer2.mysql.db' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'P>6H]M=>YOKeXGJl b -zzZRdE)/+m;>s]@-5yILQi)PS$i!U[|-8J#fr]LCAs%7');
define('SECURE_AUTH_KEY',  '/w/H*hL7Q%^0G[:S6+tz+}7oQf^9]Srg:lMVJ<hS}WS^<Yi|d`f^(fwS2G;nR>Td');
define('LOGGED_IN_KEY',    ']Z&F/:2^f;?M@8t@m=%}}_G}tX15Y%QdLt(LC/f?#U|Z/!,vy?/H{I5rPUL^1l >');
define('NONCE_KEY',        'kZlldKw-IQ`X8:s;E,1NA#QD;hSD-OwT<ScK|{kP)v=3dCl|B/ 2|`M+CP3z.ROV');
define('AUTH_SALT',        '3O_6T5.fhRg,[Jy^3:|S$0;&i5Q&(xIO~=%uJq_iCD!RoW.l~U2n|^W`5O&28jXe');
define('SECURE_AUTH_SALT', 'mYDW3~}|+.@:5Yw% 2hux[?)4=>iF$mVS2AhbkNE]X35GS&<i<N*@siad<6!jX}|');
define('LOGGED_IN_SALT',   ':P~P]bPmQ+UvU_NB:?8]>VrACRK%KjTr)Tn4*ojsj-<&oohvqm.&Gdo`,2[(;5&<');
define('NONCE_SALT',       'Lrz;++>|bd6z2Ml{m~1&kI**VK4gj>:O-!RDwqqYg`-`g)nvr;4d;E|j{0LK.2f-');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_jeroen';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

define( 'WP_HOME',    'https://jeroen.denayer.com/wordpress' );
define( 'WP_SITEURL', 'https://jeroen.denayer.com/wordpress' );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
