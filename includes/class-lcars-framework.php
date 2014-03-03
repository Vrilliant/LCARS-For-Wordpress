<?php
/**
 * @package   Lcars_Framework
 * @author    Brian Scott Gregory <universalbri@gmail.com>
 * @license   Pay or Piracy
 * @link      http://universalbri.wordpress.com
 * @copyright 2014
 */

class Lcars_Framework {

	/**
	 * Plugin version, used for cache-busting of style and script file references.
	 *
	 * @since 0.8
	 * @type string
	 */
	const VERSION = '0.8';

	/**
	 * Initialize the plugin.
	 *
	 * @since 0.8
	 */
	public function init() {

		// Load plugin text domain
//		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );

		// Needs to run every time in case theme has been changed
		add_action( 'admin_init', array( $this, 'set_theme_option' ) );

	}

	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since 0.8
	 */
	public function load_plugin_textdomain() {
		$domain = 'lcarsframework';
		$locale = apply_filters( 'plugin_locale', get_locale(), $domain );

		load_textdomain( $domain, trailingslashit( WP_LANG_DIR ) . $domain . '/' . $domain . '-' . $locale . '.mo' );
		load_plugin_textdomain( $domain, FALSE, basename( dirname( __FILE__ ) ) . '/languages' );
	}

	/**
	 * Sets option defaults
	 *
	 * @since 0.8
	 */
	function set_theme_option() {

		// Load settings
        $lcarsframework_settings = get_option( 'lcarsframework' );

        // Updates the unique option id in the database if it has changed
        if ( function_exists( 'lcarsframework_option_name' ) ) {
			lcarsframework_option_name();
        }
        elseif ( has_action( 'lcarsframework_option_name' ) ) {
			do_action( 'lcarsframework_option_name' );
        }
        // If the developer hasn't explicitly set an option id, we'll use a default
        else {
            $default_themename = get_option( 'stylesheet' );
            $default_themename = preg_replace( "/\W/", "_", strtolower($default_themename ) );
            $default_themename = 'lcarsframework_' . $default_themename;
            if ( isset( $lcarsframework_settings['id'] ) ) {
				if ( $lcarsframework_settings['id'] == $default_themename ) {
					// All good, using default theme id
				} else {
					$lcarsframework_settings['id'] = $default_themename;
					update_option( 'lcarsframework', $lcarsframework_settings );
				}
            }
            else {
				$lcarsframework_settings['id'] = $default_themename;
				update_option( 'lcarsframework', $lcarsframework_settings );
            }
        }

	}

	/**
	 * Wrapper for lcarsframework_options()
	 *
	 * Allows for manipulating or setting options via 'of_options' filter
	 * For example:
	 *
	 * <code>
	 * add_filter( 'of_options', function( $options ) {
	 *     $options[] = array(
	 *         'name' => 'Input Text Mini',
	 *         'desc' => 'A mini text input field.',
	 *         'id' => 'example_text_mini',
	 *         'std' => 'Default',
	 *         'class' => 'mini',
	 *         'type' => 'text'
	 *     );
	 *
	 *     return $options;
	 * });
	 * </code>
	 *
	 * Also allows for setting options via a return statement in the
	 * options.php file.  For example (in options.php):
	 *
	 * <code>
	 * return array(...);
	 * </code>
	 *
	 * @return array (by reference)
	 */
	static function &_lcarsframework_options() {
		static $options = null;

		if ( !$options ) {
	        // Load options from options.php file (if it exists)
	        $location = apply_filters( 'options_framework_location', array('options.php') );
	        if ( $optionsfile = locate_template( $location ) ) {
	            $maybe_options = require_once $optionsfile;
	            if ( is_array( $maybe_options ) ) {
					$options = $maybe_options;
	            } else if ( function_exists( 'lcarsframework_options' ) ) {
					$options = lcarsframework_options();
				}
	        }

	        // Allow setting/manipulating options via filters
	        $options = apply_filters( 'of_options', $options );
		}

		return $options;
	}

}