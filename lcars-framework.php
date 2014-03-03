<?php
/**
 * Vrilliant LCARS Framework
 *
 * @package   Vrilliant LCARS Framework
 * @author    Brian Scott Gregory <universalbri@gmail.com>
 * @license   Good ole POP (Pay or Piracy)
 * @link      http://vrilliant.com
 * @copyright 2014 SumYungVoman
 *
 * @wordpress-plugin
 * Plugin Name: Vrilliant LCARS Framework
 * Plugin URI:  http://vrilliant.com
 * Description: Vrilliant's framework for building LCARS (Library and Computer Access Retrieval System) Interfaces
 * Version:     0.8
 * Author:      Brian Scott Gregory
 * Author URI:  http://universalbri.wordpress.com
 * License:     Good ole POP (Pay or Piracy)
 * License URI: http://www.cia.gov
 * Text Domain: lcarsframework
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) 
{
	die;
}

function clientSideScriptLoad()
{
    wp_enqueue_style( 'lcarsframework', plugins_url( '/css/lcarsframework.css', __FILE__ ), false, '0.8', true );
    wp_enqueue_script( 'wz_jsgraphics', plugins_url( '/js/wz_jsgraphics.js', __FILE__ ), false, '0.8', true );
    wp_enqueue_script( 'LCARSSounds', plugins_url( '/js/LCARSSounds.js', __FILE__ ), false, '0.8', true );
    wp_enqueue_script( 'lcarsPageLoader', plugins_url( '/js/lcarsPageLoader.js', __FILE__ ), false, '0.8', true );
}

function lcarsframework_init() 
{
	//  If user can't edit theme options, exit
	if ( !current_user_can( 'edit_theme_options' ) )
		return;

	// Loads the required LCARS Framework classes.
	require plugin_dir_path( __FILE__ ) . 'includes/class-lcars-framework.php';
	require plugin_dir_path( __FILE__ ) . 'includes/class-lcars-framework-admin.php';

	// Instantiate the main plugin class.
	$lcars_framework = new Lcars_Framework;
	$lcars_framework->init();
}

add_action( 'wp_enqueue_scripts', 'clientSideScriptLoad' );
add_action( 'wp_loaded', 'lcarsframework_init', 20 );


/**
 * Helper function to return the theme option value.
 * If no value has been saved, it returns $default.
 * Needed because options are saved as serialized strings.
 *
 * Not in a class to support backwards compatibility in themes.
 */

if ( ! function_exists( 'lcars_get_option' ) ) :

function lcars_get_option( $name, $default = false ) {
	$config = get_option( 'lcarsframework' );

	if ( ! isset( $config['id'] ) ) {
		return $default;
	}

	$options = get_option( $config['id'] );

	if ( isset( $options[$name] ) ) {
		return $options[$name];
	}

	return $default;
}

endif;
?>
