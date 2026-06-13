import { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa'
import Button from './ui/Button'

/**
 * ErrorBoundary — catches render errors anywhere in the tree and shows
 * a recoverable fallback UI. Sits at the top of the tree (App.jsx).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] Caught:', error, info)
  }

  handleReload = () => {
    this.setState({ error: null, info: null })
    window.location.reload()
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="inline-flex w-20 h-20 rounded-2xl glass-strong border border-red-500/30 items-center justify-center mx-auto">
            <FaExclamationTriangle className="text-3xl text-red-400" />
          </div>
          <h1 className="text-3xl font-display font-black text-white">Something went wrong</h1>
          <p className="text-gray-400 text-sm">
            An unexpected error broke this view. Your data is safe — try reloading, or head back home.
          </p>
          {this.state.error?.message && (
            <pre className="text-[10px] text-left text-red-300/80 bg-red-500/5 border border-red-500/20 rounded-xl p-3 overflow-auto max-h-32 font-mono">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex gap-2 justify-center">
            <Button onClick={this.handleReload} iconLeft={<FaRedo />}>Reload</Button>
            <Button as={Link} to="/" variant="secondary" iconLeft={<FaHome />}>Home</Button>
          </div>
        </div>
      </div>
    )
  }
}
