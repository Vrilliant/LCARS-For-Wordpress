<script type="text/javascript" src="<?php  plugins_url( 'js/wz_jsgraphics.js' , __FILE__ ) ?>"></script>
<script type="text/javascript" src="<?php  plugins_url( 'js/lcarsPageLoader.js' , __FILE__ ) ?>"></script>
<?php
/**
 * @package   LCARS Framework
 * @author    Brian Scott Gregory <universalbri@gmail.com>
 * @license   Pay or Piracy
 * @link      http://www.vrilliat.com
 * @copyright 2014 Vrilliant
 */

class LCARS_Framework_Admin {

	/**
     * Page hook for the lcars screen
     *
     * @since 0.0.8
     * @type string
     */
    protected $lcars_screen = null;

    /**
     * Hook in the scripts and styles
     *
     * @since 0.0.8
     */
    public function init() {

		// Gets lcars to load
    	$lcars = & Lcars_Framework::_lcarsframework_lcars();

		// Checks if lcars are available
    	if ( $lcars ) {

			// Add the lcars page and menu item.
			add_action( 'admin_menu', array( $this, 'add_lcars_page' ) );

			// Add the required scripts and styles
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );

			// Settings need to be registered after admin_init
			add_action( 'admin_init', array( $this, 'settings_init' ) );

			// Adds lcars menu to the admin bar
			add_action( 'wp_before_admin_bar_render', array( $this, 'lcarsframework_admin_bar' ) );

		} else {
			// Display a notice if lcars aren't present in the theme
			add_action( 'admin_notices', array( $this, 'lcars_notice' ) );
			add_action( 'admin_init', array( $this, 'lcars_notice_ignore' ) );
		}

    }

	/**
     * Let's the user know that lcars aren't available for their theme
     */
    function lcars_notice() {
		global $pagenow;
        if ( !is_multisite() && ( $pagenow == 'plugins.php' || $pagenow == 'themes.php' ) ) {
			global $current_user ;
			$user_id = $current_user->ID;
			if ( ! get_user_meta($user_id, 'lcarsframework_ignore_notice') ) {
				echo '<div class="updated lcarsframework_setup_nag"><p>';
				printf( __('Your current theme does not have support for the LCARS Framework plugin.  <a href="%1$s" target="_blank">Learn More</a> | <a href="%2$s">Hide Notice</a>', 'lcarsframework'), 'http://wptheming.com/lcars-framework-plugin', '?lcarsframework_nag_ignore=0');
				echo "</p></div>";
			}
        }
	}

	/**
     * Allows the user to hide the lcars notice
     */
	function lcars_notice_ignore() {
		global $current_user;
		$user_id = $current_user->ID;
		if ( isset( $_GET['lcarsframework_nag_ignore'] ) && '0' == $_GET['lcarsframework_nag_ignore'] ) {
			add_user_meta( $user_id, 'lcarsframework_ignore_notice', 'true', true );
		}
	}

	/**
     * Registers the settings
     *
     * @since 1.7.0
     */
    function settings_init() {

    	// Load lcars Framework Settings
        $lcarsframework_settings = get_option( 'lcarsframework' );

		// Registers the settings fields and callback
		register_setting( 'lcarsframework', $lcarsframework_settings['id'],  array ( $this, 'validate_lcars' ) );

		// Displays notice after lcars save
		add_action( 'lcarsframework_after_validate', array( $this, 'save_lcars_notice' ) );

    }

	/*
	 * Define menu lcars (still limited to appearance section)
	 *
	 * Examples usage:
	 *
	 * add_filter( 'lcarsframework_menu', function( $menu ) {
	 *     $menu['page_title'] = 'The lcars';
	 *	   $menu['menu_title'] = 'The lcars';
	 *     return $menu;
	 * });
	 *
	 * @since 1.7.0
	 *
	 */
	static function menu_settings() {

		$menu = array(
			'page_title' => __( 'Theme lcars', 'lcarsframework'),
			'menu_title' => __('Theme lcars', 'lcarsframework'),
			'capability' => 'edit_theme_lcars',
			'menu_slug' => 'lcars-framework'
		);

		return apply_filters( 'lcarsframework_menu', $menu );
	}

	/**
     * Add a subpage called "Theme lcars" to the appearance menu.
     *
     * @since 1.7.0
     */
	function add_lcars_page() {

		$menu = $this->menu_settings();
		$this->lcars_screen = add_theme_page( $menu['page_title'], $menu['menu_title'], $menu['capability'], $menu['menu_slug'], array( $this, 'lcars_page' ) );

	}

	/**
     * Loads the required stylesheets
     *
     * @since 1.7.0
     */
	function enqueue_admin_styles() {
		wp_enqueue_style( 'lcarsframework', plugin_dir_url( dirname(__FILE__) ) . 'css/lcarsframework.css', array(),  lcars_Framework::VERSION );
		wp_enqueue_style( 'wp-color-picker' );
	}

	/**
     * Loads the required javascript
     *
     * @since 1.7.0
     */
	function enqueue_admin_scripts( $hook ) {

		$menu = $this->menu_settings();

		if ( 'appearance_page_' . $menu['menu_slug'] != $hook )
	        return;

		// Enqueue custom option panel JS
		wp_enqueue_script( 'lcars-custom', plugin_dir_url( dirname(__FILE__) ) . 'js/lcars-custom.js', array( 'jquery','wp-color-picker' ), lcars_Framework::VERSION );

		// Inline scripts from lcars-interface.php
		add_action( 'admin_head', array( $this, 'of_admin_head' ) );
	}

	function of_admin_head() {
		// Hook to add custom scripts
		do_action( 'lcarsframework_custom_scripts' );
	}

	/**
     * Builds out the lcars panel.
     *
	 * If we were using the Settings API as it was intended we would use
	 * do_settings_sections here.  But as we don't want the settings wrapped in a table,
	 * we'll call our own custom lcarsframework_fields.  See lcars-interface.php
	 * for specifics on how each individual field is generated.
	 *
	 * Nonces are provided using the settings_fields()
	 *
     * @since 1.7.0
     */
	 function lcars_page() { ?>

		<div id="lcarsframework-wrap" class="wrap">

		<?php $menu = $this->menu_settings(); ?>
		<h2><?php echo esc_html( $menu['page_title'] ); ?></h2>

	    <h2 class="nav-tab-wrapper">
	        <?php echo lcars_Framework_Interface::lcarsframework_tabs(); ?>
	    </h2>

	    <?php settings_errors( 'lcars-framework' ); ?>

	    <div id="lcarsframework-metabox" class="metabox-holder">
		    <div id="lcarsframework" class="postbox">
				<form action="lcars.php" method="post">
				<?php settings_fields( 'lcarsframework' ); ?>
				<?php lcars_Framework_Interface::lcarsframework_fields(); /* Settings */ ?>
				<div id="lcarsframework-submit">
					<input type="submit" class="button-primary" name="update" value="<?php esc_attr_e( 'Save lcars', 'lcarsframework' ); ?>" />
					<input type="submit" class="reset-button button-secondary" name="reset" value="<?php esc_attr_e( 'Restore Defaults', 'lcarsframework' ); ?>" onclick="return confirm( '<?php print esc_js( __( 'Click OK to reset. Any theme settings will be lost!', 'lcarsframework' ) ); ?>' );" />
					<div class="clear"></div>
				</div>
				</form>
			</div> <!-- / #container -->
		</div>
		<?php do_action( 'lcarsframework_after' ); ?>
		</div> <!-- / .wrap -->

	<?php
	}

	/**
	 * Validate lcars.
	 *
	 * This runs after the submit/reset button has been clicked and
	 * validates the inputs.
	 *
	 * @uses $_POST['reset'] to restore default lcars
	 */
	function validate_lcars( $input ) {

		/*
		 * Restore Defaults.
		 *
		 * In the event that the user clicked the "Restore Defaults"
		 * button, the lcars defined in the theme's lcars.php
		 * file will be added to the option for the active theme.
		 */

		if ( isset( $_POST['reset'] ) ) {
			add_settings_error( 'lcars-framework', 'restore_defaults', __( 'Default lcars restored.', 'lcarsframework' ), 'updated fade' );
			return $this->get_default_values();
		}

		/*
		 * Update Settings
		 *
		 * This used to check for $_POST['update'], but has been updated
		 * to be compatible with the theme customizer introduced in WordPress 3.4
		 */

		$clean = array();
		$lcars = & lcars_Framework::_lcarsframework_lcars();
		foreach ( $lcars as $option ) {

			if ( ! isset( $option['id'] ) ) {
				continue;
			}

			if ( ! isset( $option['type'] ) ) {
				continue;
			}

			$id = preg_replace( '/[^a-zA-Z0-9._\-]/', '', strtolower( $option['id'] ) );

			// Set checkbox to false if it wasn't sent in the $_POST
			if ( 'checkbox' == $option['type'] && ! isset( $input[$id] ) ) {
				$input[$id] = false;
			}

			// Set each item in the multicheck to false if it wasn't sent in the $_POST
			if ( 'multicheck' == $option['type'] && ! isset( $input[$id] ) ) {
				foreach ( $option['lcars'] as $key => $value ) {
					$input[$id][$key] = false;
				}
			}

			// For a value to be submitted to database it must pass through a sanitization filter
			if ( has_filter( 'of_sanitize_' . $option['type'] ) ) {
				$clean[$id] = apply_filters( 'of_sanitize_' . $option['type'], $input[$id], $option );
			}
		}

		// Hook to run after validation
		do_action( 'lcarsframework_after_validate', $clean );

		return $clean;
	}

	/**
	 * Display message when lcars have been saved
	 */

	function save_lcars_notice() {
		add_settings_error( 'lcars-framework', 'save_lcars', __( 'lcars saved.', 'lcarsframework' ), 'updated fade' );
	}

	/**
	 * Get the default values for all the theme lcars
	 *
	 * Get an array of all default values as set in
	 * lcars.php. The 'id','std' and 'type' keys need
	 * to be defined in the configuration array. In the
	 * event that these keys are not present the option
	 * will not be included in this function's output.
	 *
	 * @return array Re-keyed lcars configuration array.
	 *
	 */

	function get_default_values() {
		$output = array();
		$config = & lcars_Framework::_lcarsframework_lcars();
		foreach ( (array) $config as $option ) {
			if ( ! isset( $option['id'] ) ) {
				continue;
			}
			if ( ! isset( $option['std'] ) ) {
				continue;
			}
			if ( ! isset( $option['type'] ) ) {
				continue;
			}
			if ( has_filter( 'of_sanitize_' . $option['type'] ) ) {
				$output[$option['id']] = apply_filters( 'of_sanitize_' . $option['type'], $option['std'], $option );
			}
		}
		return $output;
	}

	/**
	 * Add lcars menu item to admin bar
	 */

	function lcarsframework_admin_bar() {

		$menu = $this->menu_settings();
		global $wp_admin_bar;

		$wp_admin_bar->add_menu( array(
			'parent' => 'appearance',
			'id' => 'of_theme_lcars',
			'title' => __( 'Theme lcars', 'lcarsframework' ),
			'href' => admin_url( 'themes.php?page=' . $menu['menu_slug'] )
		) );
	}
}
