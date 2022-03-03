import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  renderError?: (error: Error) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children?: ReactNode;
};

type State =
  | {
      hasError: false;
    }
  | {
      hasError: true;
      error: Error;
    };

/**
 * エラーハンドリングコンポーネントクラス
 *
 * デフォルトでは React 15 以前の動作と同様、エラーが発生してもコンポーネントをアンマウントしません。
 * エラーページを表示したい場合は、<ErrorBoundary renderError={(error) => { return <div>{error.message}</div> }}> のように実装してください。
 * エラーログをサーバーに転送したりしたい場合は、<ErrorBoundary onError={(error, errorInfo) => { logErrorToMyService(error, errorInfo); }}> のように実装してください。
 *
 * なお、Promiseによるエラーはハンドリングできません。
 *
 * @author FXS)zhang.puming
 * @see https://zh-hans.reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static defaultProps: Partial<Props> = {
    onError: (error) => {
      console.log(`%cSomething Error:${error}`, "color: red");
    },
    renderError: (error) => {
      return defaultFallbackComponent(error);
    },
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.props.renderError) {
      if (this.state.hasError) {
        return this.props.renderError(this.state.error);
      }
    }
    // 注意: this.props.children でエラーになるとコンポーネントがアンマウントされます
    return this.props.children;
  }
}

/**
 * デフォルトのエラーページコンポーネント（固定メッセージを表示するだけ）
 * @param _error エラー情報
 */
function defaultFallbackComponent(_error: Error) {
  return <div>Something Error</div>;
}
